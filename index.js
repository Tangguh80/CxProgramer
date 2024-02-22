//===================== scrroling penggabungan dan pemisahan nav3 ========================= //
window.addEventListener('scroll', function() {
    // Periksa jika posisi scroll lebih dari atau sama dengan 480px
    if (window.scrollY >= 550) {
      // Jadikan navbar3 fixed dan atur posisinya di bawah navbar2
      document.querySelector('.navbar3').style.position = 'fixed';
      document.querySelector('.navbar3').style.top = '50px'; // Atur top sesuai kebutuhan, misal di bawah navbar2
    } else {
      // Kembalikan navbar3 ke posisi relative dan atur top sesuai dengan layout asli
      document.querySelector('.navbar3').style.position = 'relative';
      document.querySelector('.navbar3').style.top = '600px'; // Sesuaikan ini sesuai dengan kebutuhan layout Anda
    }
  });








//===================== scrroling memunculkan search box pada nav2 ========================= //
window.onscroll = function() {showSearchBox()};

function showSearchBox() {
  // Dapatkan elemen search box
  var searchBox = document.querySelector('.search-box');

  // Cek posisi scroll
  if (document.body.scrollTop > 450 || document.documentElement.scrollTop > 450) {
    searchBox.style.visibility = 'visible';
    searchBox.style.opacity = 1;
  } else {
    searchBox.style.visibility = 'hidden';
    searchBox.style.opacity = 0;
  }
}







//===================== scrroling nav 1 dan 2 ========================= //

document.querySelector('.navbar1').addEventListener('click', function() {
    // Fungsi untuk melakukan scroll halus
    function smoothScroll(target, duration) {
      var targetPosition = target.getBoundingClientRect().top; // Posisi target relatif terhadap viewport
      var startPosition = window.pageYOffset; // Posisi scroll saat ini
      var startTime = null;
  
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }
  
      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
  
      requestAnimationFrame(animation);
    }
  
    smoothScroll(document.documentElement, 1000); // 1000 ms atau 1 detik untuk durasi scroll
  });
  
  const navbar1Height = document.querySelector('.navbar1').offsetHeight;
  const navbar2Height = document.querySelector('.navbar2').offsetHeight;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > navbar1Height) {
      document.querySelector('.navbar1').style.top = `-${navbar1Height}px`;
      document.querySelector('.navbar2').style.top = `0px`;
    } else {
      document.querySelector('.navbar1').style.top = `0px`;
      document.querySelector('.navbar2').style.top = `35px`;
    }
  });