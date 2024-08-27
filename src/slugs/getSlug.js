export const verifySlug = () => {
  const url = new URL(window.location.href);
  const pathname = url.pathname;
  const slug = pathname.split("/")[1] || "corusview";

  if (slug) {
    localStorage.setItem("userSlug", slug);
  } else {
    localStorage.removeItem("userSlug", slug);
  }
};
export const getUniqueSlug = () => {
  let slug = localStorage.getItem("userSlug");
  return slug;
};
