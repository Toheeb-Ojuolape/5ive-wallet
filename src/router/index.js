import { createRouter, createWebHistory } from "vue-router";
import Onboarding from "../pages/OnboardingScreens.vue";
import Dashboard from "../pages/HomePage.vue";
import Swap from "../pages/SwapPage.vue";
import Send from "../pages/SendPage.vue";
import Activity from "../pages/ActivityPage.vue";
import Profile from "@/pages/ProfilePage.vue";
import Learn from "@/pages/LearnPage.vue";
import Statistics from "@/pages/StatisticsPage.vue";
import Transaction from "@/pages/TransactionPage.vue";
import Notification from "@/pages/NotificationPage.vue";

const routes = [
  { path: "/", name: "Onboarding", component: Onboarding },
  { path: "/home", name: "Dashboard", component: Dashboard },
  { path: "/swap", name: "Swap", component: Swap },
  { path: "/send", name: "Send", component: Send },
  { path: "/history", name: "Activity", component: Activity },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/notification", name: "Notification", component: Notification },
  { path: "/learn", name: "Learn", component: Learn },
  { path: "/statistics", name: "Statistics", component: Statistics },
  { path: "/transaction", name: "Transaction", component: Transaction },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
