import React from 'react';
import Grid from '@mui/material/Grid';

// Component Imports
import CardWidgetsSalesOverview from "src/views/category/view/category-right/statics/SalesOverview";
import WeeklySales from "src/views/category/view/category-right/statics/WeeklySales";

const OverViewTab = () => {

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CardWidgetsSalesOverview />
      </Grid>
      <Grid item xs={12}>
        <WeeklySales />
      </Grid>
    </Grid>
  );
};

export default OverViewTab;
