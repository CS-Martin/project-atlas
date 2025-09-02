import { create } from 'zustand';
import { subDays } from 'date-fns';

type DashboardFilterState = {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  setDateRange: (dateRange: { from: Date | undefined; to: Date | undefined }) => void;
};

export const useDashboardFilter = create<DashboardFilterState>(set => ({
  dateRange: {
    from: subDays(new Date(), 30),
    to: new Date(),
  },
  setDateRange: dateRange => set({ dateRange }),
}));
