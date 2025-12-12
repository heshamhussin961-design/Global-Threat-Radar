// 1. إعداد مساحة الرسم (SVG)
const svg = d3.select("#map-svg");
const width = window.innerWidth;
const height = window.innerHeight;

// تحديث حجم الـ SVG ليملأ الشاشة
svg.attr("width", width).attr("height", height);

// مجموعة (Group) عشان نحط فيها رسمة الخريطة
const mapGroup = svg.append("g").attr("id", "map-layer");
// مجموعة عشان نحط فيها خطوط الهجوم (عشان تبقى فوق الخريطة)
const attacksGroup = svg.append("g").attr("id", "attacks-layer");


// 2. إعداد الـ Projection (إسقاط الخريطة)
// بنستخدم Mercator عشان دي أشهر شكل، وبنظبط مقاسها على الشاشة
const projection = d3.geoMercator()
    .scale(width / 6.5) // تعديل التقريب حسب عرض الشاشة
    .translate([width / 2, height / 1.5]); // تحريك الخريطة لمنتصف الشاشة

// الـ Path Generator: ده اللي بياخد بيانات الدول ويرسمها بناء على الـ Projection
const path = d3.geoPath().projection(projection);


// 3. تحميل بيانات الخريطة (JSON) ورسمها
// لازم الملف world.json يكون موجود جمب ملف الـ js
// غيرنا اسم الملف المحلي برابط مباشر
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function(data) {
    // رسم الدول
    mapGroup.selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "country"); // ربطناه بكلاس الـ CSS

    console.log("Map loaded successfully!");

    // بعد ما الخريطة تتحمل، نبدأ محاكاة الهجمات
    simulateAttacks();

}).catch(err => {
    console.error("Error loading geojson:", err);
    alert("تأكد من وجود ملف world.geojson في نفس المسار");
});


// --- دوال المساعدة ---

// دالة لرسم خط هجوم بين نقطتين
function drawAttack(fromCoords, toCoords, malwareName) {
    // تحويل إحداثيات (طول/عرض) لنقاط على الشاشة (X/Y) باستخدام نفس الـ projection
    const source = projection(fromCoords);
    const target = projection(toCoords);

    // رسم الخط
    const line = attacksGroup.append("line")
        .attr("x1", source[0])
        .attr("y1", source[1])
        .attr("x2", source[0]) // يبدأ كنقطة
        .attr("y2", source[1]) // يبدأ كنقطة
        .attr("class", "attack-line")
        .style("opacity", 1);

    // أنيميشن للخط عشان يتحرك للهدف ويختفي
    line.transition()
        .duration(1000) // مدة حركة الخط للهدف
        .attr("x2", target[0])
        .attr("y2", target[1])
        .on("end", function() {
            // بعد ما يوصل، يختفي بالتدريج
            d3.select(this)
                .transition()
                .duration(2000)
                .style("opacity", 0)
                .remove(); // مسح الخط من الـ DOM
        });

    // إضافة للوجز
    addLogEntry(malwareName, "Unknown", "Unknown"); // هنا ممكن تضيف أسماء الدول لو معاك
}


// دالة لإضافة سطر في صندوق اللوجز
function addLogEntry(malware, fromCountry, toCountry) {
    const logsList = document.getElementById("logs-list");
    const time = new Date().toLocaleTimeString();

    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.innerHTML = `[${time}] <span class="log-malware">${malware}</span> detected.`;

    // إضافة السطر في الأول
    logsList.insertBefore(entry, logsList.firstChild);

    // مسح اللوجز القديمة عشان الميموري
    if (logsList.children.length > 20) {
        logsList.removeChild(logsList.lastChild);
    }
}


// --- دالة محاكاة (للتجربة فقط) ---
// دي بتمثل الداتا اللي جاية من السيرفر بتاعك
function simulateAttacks() {
    // إحداثيات تقريبية لبعض الأماكن (Longitude, Latitude)
    const locations = [
        [-74.006, 40.7128], // NY, USA
        [37.617, 55.755], // Moscow, RU
        [116.407, 39.904], // Beijing, CN
        [13.405, 52.52], // Berlin, DE
        [-43.172, -22.906] // Rio, BR
    ];
    const malwares = ["Emotet", "QakBot", "CobaltStrike", "TrickBot"];

    setInterval(() => {
        const randomFrom = locations[Math.floor(Math.random() * locations.length)];
        const randomTo = locations[Math.floor(Math.random() * locations.length)];
        const randomMalware = malwares[Math.floor(Math.random() * malwares.length)];

        if (randomFrom !== randomTo) {
            drawAttack(randomFrom, randomTo, randomMalware);
        }
    }, 1500); // هجمة كل ثانية ونص
}