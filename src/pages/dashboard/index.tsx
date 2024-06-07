import { NextPage } from "next";
import dynamic from 'next/dynamic';
import Grid from '@mui/material/Grid';
import ApexChartWrapper from '../../@core/styles/libs/react-apexcharts';
import { withAuth } from "../../@core/SSR/lib/auth";
import { DimensionsProvider } from "src/@core/context/DimensionsContext";
import AverageOrderValue from "src/views/dashboard/AverageOrderValue";
import TopProducts from "src/views/dashboard/TopProducts";
import TopServices from "src/views/dashboard/TopServices";
import SalesChartHeader from "src/views/dashboard/SalesChartHeader";
import Banner from "src/views/dashboard/Banner";
import BannerCarousel from "src/views/dashboard/BannerCarousel";
import Table from '../../views/dashboard/Table';
import { User } from "../../@core/interface/user/interface";
import TouristMapInfo from "src/views/dashboard/TouristMapInfo";
import StaffAndClientTable from "src/views/dashboard/StaffAndClientTable";

const DynamicCard = dynamic(() => import('src/views/dashboard/Card'), { ssr: false });

interface DashboardProps {
  userProfile: User;
  initialIsLoading: boolean;
}

export const getServerSideProps = withAuth(async (context) => {
  const { userProfile } = context;

  return {
    props: {
      userProfile,
      messages: (await import(`../../messages/${context.locale}.json`)).default,
      initialIsLoading: true,
    },
  };
});

const Dashboard: NextPage<DashboardProps> = ({ userProfile, initialIsLoading }) => {
  return (
    <ApexChartWrapper>
      <DimensionsProvider>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <BannerCarousel />
          </Grid>
          <Grid item xs={12} md={6}>
            <AverageOrderValue />
          </Grid>
          <Grid item xs={12} md={9}>
            <SalesChartHeader />
          </Grid>
          <Grid item xs={12} md={3}>
            <Banner />
          </Grid>
          <Grid item xs={12}>
            <Table />
          </Grid>
          <Grid item xs={12} md={6}>
            <TouristMapInfo />
          </Grid>
          <Grid item xs={12} md={6}>
            <DynamicCard />
          </Grid>
          <Grid item xs={12} md={6}>
            <TopProducts />
          </Grid>
          <Grid item xs={12} md={6}>
            <TopServices />
          </Grid>
          <Grid item xs={12} md={12}>
            <StaffAndClientTable   />
          </Grid>
        </Grid>
      </DimensionsProvider>
    </ApexChartWrapper>
  );
};

export default Dashboard;
