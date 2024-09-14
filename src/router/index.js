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
import { isAuthenticated } from "@/services/authService";

const routes = [
  {
    path: "/",
    name: "Onboarding",
    component: Onboarding,
    meta: { isAuth: true },
  },
  {
    path: "/home",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/swap",
    name: "Swap",
    component: Swap,
    meta: { requiresAuth: true },
  },
  {
    path: "/send",
    name: "Send",
    component: Send,
    meta: { requiresAuth: true },
  },
  {
    path: "/history",
    name: "Activity",
    component: Activity,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/notification",
    name: "Notification",
    component: Notification,
    meta: { requiresAuth: true },
  },
  {
    path: "/learn",
    name: "Learn",
    component: Learn,
    meta: { requiresAuth: true },
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
    meta: { requiresAuth: true },
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: Transaction,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/");
  } else next();
});

//prevent logged in users from accessing auth pages
router.beforeEach((to, from, next) => {
  if (to.meta.isAuth && isAuthenticated()) {
    next("/home");
  } else next();
});

export default router;
