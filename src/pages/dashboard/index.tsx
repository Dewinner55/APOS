// ** Next Import
import {NextPage} from "next";

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from '../../@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from '../../@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from '../../views/dashboard/Table'
import Trophy from '../../views/dashboard/Trophy'
import StatisticsCard from '../../views/dashboard/StatisticsCard'

import { useTranslations } from 'next-intl';

// interface Import
import {User} from "../../@core/interface/user/interface";
import {withAuth} from "../../@core/SSR/lib/auth";

interface DashboardProps {
  userProfile: User;
  initialIsLoading: boolean;
}

export const getServerSideProps = withAuth(async (context) => {
  const {userProfile} = context;

  return {
    props: {
      userProfile,
      messages: (await import(`../../messages/${context.locale}.json`)).default,
      initialIsLoading: true,
    },
  };
});

const Dashboard: NextPage<DashboardProps> = ({userProfile}) => {
  const t = useTranslations('dashboard');

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy userProfile={userProfile} t={t} />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={8}>
          <Table />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$25.6k'
                icon={<Poll />}
                color='success'
                trendNumber='+42%'
                title={t('totalProfit')}
                subtitle={t('weeklyProfit')}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='$78'
                title='Refunds'
                trend='negative'
                color='secondary'
                trendNumber='-15%'
                subtitle='Past Month'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='862'
                trend='negative'
                trendNumber='-18%'
                title='New Project'
                subtitle='Yearly Project'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='15'
                color='warning'
                trend='negative'
                trendNumber='-18%'
                subtitle='Last Week'
                title='Sales Queries'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
