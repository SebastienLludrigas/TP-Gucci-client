import Vue from 'vue';
import dayjs from 'dayjs';

const dateFilter = (value) => {
  return dayjs(value).format('DD/MM/YYYY')
};

Vue.filter('date', dateFilter);