const mark = document.getElementById('mark');
const floorBtn = document.getElementById('floor-btn');

const floorMark = () => {
    const stuMark = mark.value;
    const mod = stuMark % 10;
    let newMark = 0;

    if (stuMark <0 || stuMark > 100 || stuMark === '') {
        alert("invalid student's mark" + stuMark);
    } else if (stuMark < 50) {
        alert("Không làm tròn vì điểm trượt!" + stuMark);
    } else {
        if (mod === 9 || mod === 8) {
            newMark = parseInt(stuMark) + (10 - mod);
            alert("Điểm sau khi làm tròn là: "+ newMark);
        } else if (mod === 4 || mod === 3) {
            newMark = parseInt(stuMark) + (5 - mod);
            alert("Điểm sau khi làm tròn là: "+ newMark);
        } else {
            newMark = stuMark;
            alert("Điểm không được làm tròn: "+ newMark);
        }
    }
};

floorBtn.addEventListener('click', floorMark);