interface RoutesName {
  HOME: string;
  LOGIN: string;
  SEARCH: string;
  USER: string;
  CITY: string;
  ABOUTUS: string;
  HOWITWORKS: string;
  PROFESSIONALS: string;
  PRIVACYPOLICY: string;
  TERMSOFUSE: string;
  PROFILEFORM: string;
  USERS: string;
  SUBSCRIBE: string;
  BLOG: string;
  NONPROFIT: string;
  ORGANIZATION: string;
  CHECKOUT: string;
  ORGANIZATIONS: string

}
export const Routes: RoutesName = {
  HOME: "/",
  LOGIN: "/login",
  SEARCH: "/search",
  USER: "/user/:id",
  CITY: "/city",
  ABOUTUS: "/about-us",
  HOWITWORKS: "/how-it-works",
  PROFESSIONALS: "/join-our-professionals",
  PRIVACYPOLICY: "/privacy-policy",
  TERMSOFUSE: "/terms-of-use",
  PROFILEFORM: "/profile-form",
  USERS: "/professionals",
  SUBSCRIBE: "/news-letter",
  BLOG: "/blog",
  NONPROFIT: "/join-our-organizations",
  ORGANIZATION: "/org/:id",
  CHECKOUT: '/check-out',
  ORGANIZATIONS: '/organizations'
};
