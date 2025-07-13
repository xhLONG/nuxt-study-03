export const useTdk = (pageTdk) => {
  return {
    title: pageTdk.title,
    ogTitle: pageTdk.title,
    description: pageTdk.description,
    ogDescription: pageTdk.description,
    ogImage: pageTdk.imgUrl,
    twitterCard: 'summary_large_image',
  }
}
