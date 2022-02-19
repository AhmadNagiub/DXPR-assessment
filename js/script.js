// Main Variables

var cards = document.querySelector(".cards"),
    loader = document.querySelector(".loader"),
    limit = 6,
    delayFlag=false,
    data = [
    {
        brandName:"Reddit",
        brandIcon:"reddit",
        time:"2 days ago",
        tag:"design",
        mainTitle:"Senior Product  <br> Designer-Singapore",
        applied:"32",
        capacity:"50"
    },
    {
        brandName:"dribbble",
        brandIcon:"dribbble",
        time:"4 days ago",
        tag:"product",
        mainTitle:"junior Product <br> Designer-Singapore",
        applied:"42",
        capacity:"70"
    },
    {
        brandName:"mailchimp",
        brandIcon:"mailchimp",
        time:"2 days ago",
        tag:"design",
        mainTitle:"software architect <br>  java-usa",
        applied:"52",
        capacity:"100"
    },
]

// scroll event
    window.addEventListener('scroll',  () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;
        
        if (scrollTop + clientHeight > scrollHeight - 5 && delayFlag ==true ) {
            // limit = limit +3
            limit=3
            loadCards(limit)
            delayFlag=false
        }
    }, {
        passive: true
    });


// Display Data in html
function displayData(data){
    var cont = ``;
    
    for (var i = 0; i < data.length; i++) {
        var percent= (data[i].applied *100) / data[i].capacity
        cont += `
        <div class="card">
        <div class="card-header">
            <div class="card-info">
                <div class="card-info-image">
                    <i class="fa-brands fa-${data[i].brandIcon}"></i> 
                </div>
                <div class="card-info-details">
                    <span class="card-info-details-brand">
                    ${data[i].brandName}
                    </span>
                    <span class="card-info-details-time">
                    ${data[i].time}
                    </span>
                </div>
            </div>
            <div class="btn">
                <span>${data[i].tag}</span>
            </div>
        </div>
            <div class="card-title">
            ${data[i].mainTitle}
            </div>
            <div class="progress">
                <div class="card-progress-bar">
                    <div style="width:${percent}% ;" class="progress-percent"></div>
                </div>
                <div class="card-progress-details">
                    <span class="applay">${data[i].applied} <span class="appliedNo"></span> Applied </span>  
                    <span class="capacity">of <span class="capacityNo">${data[i].capacity}</span> Capacity</span>
                </div>
            </div>

    </div>
        `;
    }
    cards.innerHTML = cont;
}

// Showing and hiding loader
const showLoader = () => {
    loader.classList.remove('hide');
};
const  hideLoader = () => {
    loader.classList.add('hide');
};

const loadCards =  (limit) => {
    // show the loader
    showLoader();
    // after 3 seconds later
    setTimeout( () => {
        try {
            delayFlag=true
            if (data.length > 0) {
                    const card = new Promise((resolve , reject)=>{
                        for(var i =0 ; i<limit ; i++){
                            data.push(data[i])
                        }
                        return data
                    }).then(
                        displayData(data)
                    )
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            hideLoader();
        }
    }, 3000);

};
// initialize
loadCards(limit)