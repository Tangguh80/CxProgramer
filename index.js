// Menemukan semua elemen dengan kelas .coba
var cobaButtons = document.querySelectorAll('.coba');

// Menambahkan event listener untuk setiap tombol "Coba"
cobaButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Nonaktifkan scroll
  });
});

document.getElementById('belum').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'none';
  document.body.style.overflow = 'auto'; // Aktifkan kembali scroll
});

document.getElementById('sudah').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'none';
  document.body.style.overflow = 'auto'; // Aktifkan kembali scroll
});







//===================== fungsi tombol selengkapnya menampilkan conten ========================= //
document.querySelectorAll('.selengkapnya').forEach(function(selengkapnyaBtn) {
  selengkapnyaBtn.addEventListener('click', function() {
    var parent = this.closest('.tabs-isi-utama');
    var img = parent.querySelector('.img-tabs');
    var unduhBtn = parent.querySelector('.unduh');
    var cobaBtn = parent.querySelector('.coba');
    var icon = this.querySelector('.chevron-icon');

    [img, unduhBtn, cobaBtn].forEach(function(element) {
      element.style.display = element.style.display === 'none' ? 'block' : 'none';
    });

    var isHidden = img.style.display === 'none';
    this.innerHTML = isHidden ? 'Selengkapnya <ion-icon name="chevron-down-sharp" class="chevron-icon"></ion-icon>' : 'Sembunyikan <ion-icon name="chevron-down-sharp" class="chevron-icon"></ion-icon>';
    icon = this.querySelector('.chevron-icon'); // Re-select the icon as it's re-added to the button

    // Determine the rotation direction and apply the corresponding animation class
    if (isHidden) {
      icon.classList.remove('chevron-rotate-ccw');
      icon.classList.add('chevron-rotate-cw');
    } else {
      icon.classList.remove('chevron-rotate-cw');
      icon.classList.add('chevron-rotate-ccw');
    }
  });
});














//===================== menampilkan konten navbar3 ========================= //
document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll(".nav-buttons3 button");
  const contents = {
    "guide-btn": document.querySelector(".Guide-isi"),
    "install-btn": document.querySelector(".Installation-isi"),
    "usage-btn": document.querySelector(".Usage-isi"),
  };

  function setActiveButton(buttonId) {
    // Remove active-btn class from all buttons
    buttons.forEach(btn => btn.classList.remove("active-btn"));
    // Hide all content divs
    Object.values(contents).forEach(content => content.style.display = "none");

    // Add active-btn class to the specified button by id and show its content
    document.getElementById(buttonId).classList.add("active-btn");
    contents[buttonId].style.display = "block";
  }

  // Retrieve the last active button from localStorage, defaulting to "guide-btn" if none is found
  const lastActiveButton = localStorage.getItem('lastActiveButton') || "guide-btn";
  setActiveButton(lastActiveButton);

  buttons.forEach(button => {
    button.addEventListener("click", function() {
      const buttonId = this.id;
      // Set the clicked button as active and display its content
      setActiveButton(buttonId);
      // Store the last active button in localStorage
      localStorage.setItem('lastActiveButton', buttonId);
    });
  });
});

















//===================== pencarian dan higlight ========================= //
document.addEventListener('DOMContentLoaded', function() {
  const searchInputs = document.querySelectorAll('.search-box input, .judul-search-box input');

  // Atur ulang nilai input menjadi kosong saat halaman dimuat
  searchInputs.forEach(function(input) {
    input.value = '';
  });

  function synchronizeInputValues(sourceValue) {
    searchInputs.forEach(function(input) {
      input.value = sourceValue;
    });
  }

  function removeHighlights() {
    document.querySelectorAll('.highlight').forEach(function(el) {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize(); // Menggabungkan kembali node teks yang terpisah
    });
  }

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

  function scrollToFirstHighlight() {
    const firstHighlight = document.querySelector('.highlight');
    if (firstHighlight) {
      firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  searchInputs.forEach(function(input) {
    input.addEventListener('input', function() {
      const value = this.value;
      synchronizeInputValues(value); // Pastikan nilai input selalu sinkron

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
    document.querySelector('.navbar3').style.top = '53px'; // Atur top sesuai kebutuhan, misal di bawah navbar2
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
  if (window.matchMedia("(max-width: 414px)").matches) {
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
