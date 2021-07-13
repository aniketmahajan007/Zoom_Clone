// Setting Current Date on Welcome page
function update_time(){
    let cur_time = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let am_pm;
    if(cur_time.getHours() > 12){
        am_pm = "PM.";
    }else{
        am_pm = "AM."
    }
    document.getElementById("cur_time_").innerText = `${cur_time.getHours()}:${cur_time.getMinutes()} ${am_pm} ${monthNames[cur_time.getMonth()]} ${cur_time.getDate()}`;
}
update_time();
setInterval(()=>{
    update_time();
},3000);