import { createRouter, createWebHistory } from "vue-router";
import Onboarding from "../pages/index.vue";
import Dashboard from "../pages/home.vue";
import Swap from "../pages/swap.vue";
import Send from "../pages/send.vue";
import Activity from "../pages/history.vue";
import Profile from "@/pages/profile.vue";
import Learn from "@/pages/learn.vue";
import Statistics from "@/pages/statistics.vue";
import Transaction from "@/pages/transaction.vue";
import Notification from "@/pages/notification.vue";

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
