'use client'

// MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'

// Type Imports
import type { CustomInputHorizontalProps } from './types'

const Root = styled('div', {
  name: 'MuiCustomInputHorizontal',
  slot: 'root'
})(({ theme }) => ({
  blockSize: '100%',
  display: 'flex',
  gap: theme.spacing(1),
  borderRadius: 'var(--mui-shape-borderRadius)',
  cursor: 'pointer',
  position: 'relative',
  alignItems: 'flex-start',
  border: '1px solid',
  borderColor: 'var(--mui-palette-customColors-inputBorder)',
  padding: theme.spacing(4),
  transition: theme.transitions.create(['border-color'], {
    duration: theme.transitions.duration.shorter
  }),

  '&:hover': {
    borderColor: 'var(--mui-palette-action-active)'
  },
  '&.active': {
    borderColor: 'var(--mui-palette-primary-main)',
    '& i, & svg': {
      color: 'var(--mui-palette-primary-main) !important'
    }
  }
}))

const Title = styled(Typography, {
  name: 'MuiCustomInputHorizontal',
  slot: 'title'
})(({ theme }) => ({
  letterSpacing: '0.15px',
  fontWeight: theme.typography.fontWeightMedium
}))

const Meta = styled(Typography, {
  name: 'MuiCustomInputHorizontal',
  slot: 'meta'
})({
  color: 'var(--mui-palette-text-disabled)'
})

const Content = styled(Typography, {
  name: 'MuiCustomInputHorizontal',
  slot: 'content'
})({})

const RadioInput = styled(Radio, {
  name: 'MuiCustomInputHorizontal',
  slot: 'input'
})(({ theme }) => ({
  marginBlockStart: theme.spacing(-0.25),
  marginInlineStart: theme.spacing(-0.25)
}))

const CheckboxInput = styled(Checkbox, {
  name: 'MuiCustomInputHorizontal',
  slot: 'input'
})(({ theme }) => ({
  marginBlockStart: theme.spacing(-0.25),
  marginInlineStart: theme.spacing(-0.25)
}))

const CustomInputHorizontal = (props: CustomInputHorizontalProps) => {
  // Props
  const { type, data, name, selected, gridProps, handleChange, color = 'primary' } = props

  // Vars
  const { meta, title, value, content } = data

  const renderData = () => {
    if (meta && title && content) {
      return (
        <div className='flex flex-col bs-full is-full gap-1.5'>
          <div className='flex items-start justify-between is-full mbs-1.5 gap-1.5'>
            {typeof title === 'string' ? <Title color='text.primary'>{title}</Title> : title}
            {typeof meta === 'string' ? <Meta variant='body2'>{meta}</Meta> : meta}
          </div>
          {typeof content === 'string' ? <Content variant='body2'>{content}</Content> : content}
        </div>
      )
    } else if (meta && title && !content) {
      return (
        <div className='flex items-start justify-between is-full mbs-1.5 gap-1.5'>
          {typeof title === 'string' ? <Title color='text.primary'>{title}</Title> : title}
          {typeof meta === 'string' ? <Meta variant='body2'>{meta}</Meta> : meta}
        </div>
      )
    } else if (!meta && title && content) {
      return (
        <div className='flex flex-col bs-full gap-1 mbs-1.5'>
          {typeof title === 'string' ? <Title color='text.primary'>{title}</Title> : title}
          {typeof content === 'string' ? <Content variant='body2'>{content}</Content> : content}
        </div>
      )
    } else if (!meta && !title && content) {
      return typeof content === 'string' ? (
        <Content variant='body2' className='mbs-1.5'>
          {content}
        </Content>
      ) : (
        content
      )
    } else if (!meta && title && !content) {
      return typeof title === 'string' ? (
        <Title color='text.primary' className='mbs-1.5'>
          {title}
        </Title>
      ) : (
        title
      )
    } else {
      return null
    }
  }

  return data ? (
    <Grid item {...gridProps}>
      <Root
        onClick={() => handleChange(value)}
        className={classnames({
          active: type === 'radio' ? selected === value : selected.includes(value)
        })}
      >
        {type === 'radio' ? (
          <RadioInput name={name} color={color} value={value} onChange={handleChange} checked={selected === value} />
        ) : (
          <CheckboxInput
            color={color}
            name={`${name}-${value}`}
            checked={selected.includes(value)}
            onChange={() => handleChange(value)}
          />
        )}
        {renderData()}
      </Root>
    </Grid>
  ) : null
}

export default CustomInputHorizontal
