const express = require('express');
const axios = require('axios'); // عشان نجيب البيانات من بره
const path = require('path'); // عشان نتعامل مع المسارات والفولدرات
const app = express();
const PORT = 3000;

// ==========================================
// 1. إعدادات السيرفر والملفات الثابتة (Public)
// ==========================================

// السطر ده بيقول للسيرفر: "أي ملفات html, css, js, images هتلاقيها جوه فولدر public"
app.use(express.static(path.join(__dirname, 'public')));

// لو حد فتح الصفحة الرئيسية، ابعتله ملف index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==========================================
// 2. الـ API اللي بيجيب التهديدات (The Backend Logic)
// ==========================================

app.get('/api/threats', async(req, res) => {
    try {
        console.log('Fetching threat data...');

        // الرابط الجديد والصحيح (بدون شرطة في الاسم)
        const url = 'https://feodotracker.abuse.ch/downloads/ipblocklist.json';

        const response = await axios.get(url);

        // بنبعت البيانات اللي جت للـ Frontend
        // ممكن نفلترها هنا لو عايز، بس هنبعتها كلها دلوقتي
        // بناخد أول 50 تهديد بس عشان الصفحة متتقلش
        const threats = response.data.slice(0, 50);

        res.json({
            status: 'success',
            count: threats.length,
            data: threats
        });

        console.log(`Successfully fetched ${threats.length} threats.`);

    } catch (error) {
        console.error('Error fetching threats:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch threat data',
            details: error.message
        });
    }
});

// ==========================================
// 3. تشغيل السيرفر
// ==========================================
app.listen(PORT, () => {
    console.log(`\n==================================================`);
    console.log(`🛡️  GLOBAL THREAT RADAR SERVER ONLINE`);
    console.log(`📡  Server running at: http://localhost:${PORT}`);
    console.log(`📁  Serving files from: ${path.join(__dirname, 'public')}`);
    console.log(`==================================================\n`);
});