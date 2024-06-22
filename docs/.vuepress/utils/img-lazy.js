export const initImage = () => {
  var lazyImages = [].slice.call(document.querySelectorAll('img[data-src]'))

  if ('IntersectionObserver' in window) {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target
          lazyImage.src = lazyImage.dataset.src
          observer.unobserve(lazyImage)
        }
      })
    })

    lazyImages.forEach((lazyImage) => {
      observer.observe(lazyImage)
    })
  } else {
    // 回退方案：简单的滚动事件监听
    let lazyLoadImages = function () {
      lazyImages.forEach((lazyImage) => {
        if (
          lazyImage.offsetTop <
          window.innerHeight + document.documentElement.scrollTop
        ) {
          lazyImage.src = lazyImage.dataset.src
          document.removeEventListener('scroll', lazyLoadImages)
        }
      })
    }

    document.addEventListener('scroll', lazyLoadImages)
    lazyLoadImages() // 在页面加载完成后立即调用一次
  }
}
