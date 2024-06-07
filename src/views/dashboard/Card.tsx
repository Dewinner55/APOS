import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { interpolate } from "@popmotion/popcorn";

const Container = styled.div`
  border-radius: 8px;
  transform-style: preserve-3d;
  perspective: 1000px;
  width: 100%;
  height: 100%;
  margin: 2rem 0;
`;

const Content = styled(motion.div)`
  position: relative;
  width: 95%;
  height: 100%;
  border-radius: 8px;
  transform-style: preserve-3d;
`;

const Shadow = styled.div<{ hover: string | undefined }>`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  border-radius: 1rem;
  height: 90%;
  transition: all 0.2s ease-out 0s;
  box-shadow: ${(props) => (props.hover === 'true' ? "rgba(0, 0, 0, 0.6) 0px 50px 100px -30px" : "none")};
`;

const RelativeContainer = styled.div`
  position: absolute;
  width: 95%;
  height: 100%;
  border-radius: 1rem;
  overflow: hidden;
  backface-visibility: hidden;
`;

const Image = styled.div<{ imageurl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  border-radius: 1rem;
  background-image: url(${(props) => props.imageurl});
  backface-visibility: hidden;
`;

const FrontSide = styled(RelativeContainer)`
  transform: rotateY(0deg);
`;

const BackSide = styled(RelativeContainer)`
  transform: rotateY(180deg);
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface CardProps {
  height?: string;
  width?: string;
}

const Card: React.FC<CardProps> = ({ height = '300px', width = '100%' }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 300, height: 400 });

  const updateDimensions = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, [ref]);

  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    updateDimensions(); // Set initial dimensions

    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const centerPoint = [dimensions.width / 2, dimensions.height / 2];
  const xy = useMotionValue(centerPoint);

  const tx = 0.05;

  const transformX = interpolate([0, dimensions.width], [dimensions.width * tx, dimensions.width * tx * -1]);
  const rotateY = useTransform(xy, ([x]) => transformX(x));

  const transformY = interpolate(
    [0, dimensions.height],
    [dimensions.height * tx * -1, dimensions.height * tx * 1]
  );
  const rotateX = useTransform(xy, ([, y]) => transformY(y));

  const config = {
    stiffness: 150,
    damping: 20,
  };

  const springX = useSpring(rotateX, config);
  const springY = useSpring(rotateY, config);

  function onMouseOver(e: React.MouseEvent<HTMLDivElement>) {
    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
    xy.set([e.clientX - rect.left, e.clientY - rect.top]);
  }

  function hoverStart() {
    setHover(true);
  }

  function hoverEnd() {
    setHover(false);
  }

  useEffect(() => {
    if (!hover) {
      xy.set(centerPoint);
    }
  }, [hover, xy, centerPoint]);

  function handleClick() {
    setFlipped(!flipped);
  }

  return (
    <Container ref={ref} style={{ height, width }} onClick={handleClick}>
      <Content
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8 }}
        style={{
          scale: 1,
          rotateX: springX,
          rotateY: springY,
        }}
        whileHover={{
          scale: 1.03,
        }}
        whileTap={{
          scale: 0.97,
        }}
        onHoverStart={hoverStart}
        onHoverEnd={hoverEnd}
        onMouseMove={onMouseOver}
      >
        <Shadow hover={hover.toString()} /> {/* Исправление ошибки */}
        <FrontSide>
          <Image imageurl="/images/dashboard/cash_app_debit_card.jpg" /> {/* Преобразование imageUrl в imageurl */}
        </FrontSide>
        <BackSide>
          <Image imageurl="/images/dashboard/cash_app_debit_card5.jpg" /> {/* Преобразование imageUrl в imageurl */}
        </BackSide>
      </Content>
    </Container>
  );
};

export default React.memo(Card);
