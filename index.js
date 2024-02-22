//===================== script pencarian kata ========================= //

document.addEventListener('DOMContentLoaded', function() {
  const searchInputs = document.querySelectorAll('.search-box input, .judul-search-box input');

  // Atur ulang nilai input menjadi kosong saat halaman dimuat
  searchInputs.forEach(function(input) {
    input.value = '';
  });
  
  // Fungsi untuk membersihkan highlight
  function removeHighlights() {
    document.querySelectorAll('.highlight').forEach(function(el) {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize(); // Menggabungkan kembali node teks yang terpisah
    });
  }

  // Fungsi untuk mencari dan highlight teks
  function highlightText(node, text) {
    if (!text.trim()) return;

    const regex = new RegExp(`(${text})`, 'gi');
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
    let n;

    while (n = walker.nextNode()) {
      if (n.nodeType === 3 && n.textContent.match(regex)) {
        const frag = document.createDocumentFragment();
        let lastIdx = 0;
        n.textContent.replace(regex, (match, p1, offset) => {
          const before = document.createTextNode(n.textContent.slice(lastIdx, offset));
          const highlighted = document.createElement('span');
          highlighted.className = 'highlight';
          highlighted.textContent = match;
          frag.appendChild(before);
          frag.appendChild(highlighted);
          lastIdx = offset + match.length;
        });
        const after = document.createTextNode(n.textContent.slice(lastIdx));
        frag.appendChild(after);

        n.parentNode.replaceChild(frag, n);
      }
    }
  }

  // Fungsi untuk melakukan scroll ke highlight pertama
  function scrollToFirstHighlight() {
    const firstHighlight = document.querySelector('.highlight');
    if (firstHighlight) {
      firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Sinkronisasi nilai antar input dan lakukan pencarian serta highlight
  searchInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      const value = this.value;
      searchInputs.forEach(function(otherInput) {
        if (otherInput !== input) {
          otherInput.value = value;
        }
      });

      removeHighlights();
      highlightText(document.body, value);
      scrollToFirstHighlight();
    });
  });
});


















//===================== scrroling penggabungan dan pemisahan nav3 ========================= //
window.addEventListener('scroll', function() {
  // Periksa jika posisi scroll lebih dari atau sama dengan 550px
  if (window.scrollY >= 550) {
    // Jadikan navbar3 fixed dan atur posisinya di bawah navbar2
    document.querySelector('.navbar3').style.position = 'fixed';
    document.querySelector('.navbar3').style.top = '50px'; // Atur top sesuai kebutuhan, misal di bawah navbar2
    document.querySelector('.judul-search-box').style.marginBottom = '200px'; // Ubah margin-bottom menjadi 200px
  } else {
    // Kembalikan navbar3 ke posisi relative dan atur top sesuai dengan layout asli
    document.querySelector('.navbar3').style.position = 'relative';
    document.querySelector('.navbar3').style.top = '600px'; // Sesuaikan ini sesuai dengan kebutuhan layout Anda
    document.querySelector('.judul-search-box').style.marginBottom = '150px'; // Kembalikan margin-bottom ke nilai semula
  }
});




window.addEventListener('scroll', function() {
  // Cek ukuran viewport apakah maksimal 414px
  if (window.matchMedia("(max-width: 375px)").matches) {
    // Logika untuk viewport maksimal 414px
    if (window.scrollY >= 550) {
      // Jadikan navbar3 fixed dan atur posisinya di bawah navbar2
      document.querySelector('.navbar3').style.position = 'fixed';
      document.querySelector('.navbar3').style.top = '50px'; // Atur top sesuai kebutuhan
      // Ubah margin-bottom menjadi 200px, disesuaikan karena navbar3 sekarang fixed
      document.querySelector('.judul-search-box').style.marginBottom = '100px';
    } else {
      // Kembalikan navbar3 ke posisi relative dan atur top kembali
      document.querySelector('.navbar3').style.position = 'relative';
      document.querySelector('.navbar3').style.top = '600px'; // Sesuaikan ini sesuai layout
      // Kembalikan margin-bottom ke nilai semula
      document.querySelector('.judul-search-box').style.marginBottom = '45px';
    }
  } else {

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
