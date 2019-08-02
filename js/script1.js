let jsonObject;
let searchedObjects;
let result;




// On Page Load



$(() => {

    pageStarter();

    $('#localSearchInlineRadio').change(() => {
        $('#containerAPI').hide();
        $('#containerLocalStorage').show();


    })

    $('#APISearchInlineRadio').change(() => {
        $('#containerLocalStorage').hide();
        $('#containerAPI').show();


    })

    $('#apiToggleButton').click(() => {
        $('#containerAPI').show();
        $('#containerLocalStorage').hide();
    })

    $('#localStorageToggleButton').click(() => {
        $('#containerLocalStorage').show();
        $('#containerAPI').hide();
    })
    enterKey();

    $(button).click(() => {
        loadData();
    });

    $('#localStorageSearchButton').click(() => {
        query();
    })

    buttonFormat();

    $('.dropdown').hover(() => {
        $('.dropdown-menu').toggle();
    }, () => {
        $('.dropdown-menu').toggle();
    });

});









// Function Definitions


// Searching from API. Function to get data from API and return results to table based on search
function loadData() {
    let searchTerm = $.trim($(field).val());
    let url = path + encodeURIComponent(searchTerm);
    console.log(url);
    beforeSend();
    $('#mainTable tfoot').toggle();
    const request = new XMLHttpRequest();
    request.open('get', url, true);
    request.onload = () => {
        try {
            const json1 = JSON.parse(request.responseText);
            if (json1.length != 0) {
                json1.forEach(item => {
                    $(table).append("<tr><td>" + item.code + "</td><td>" + item.english + "</td><td>" + item.description + "</td></tr>");
                });
                $('#mainTable tfoot').toggle();
                $('#preloader').hide();
                $(button).prop('disabled', false);
            }
            else {
                $(table).append("<tr><td class=\" alert-danger text-center\" colspan = \" 3 \">Search Term matched no results</td></tr>");
                $('#mainTable tfoot').toggle();
                $('#preloader').hide();
                $(button).prop('disabled', false);
            }
        }
        catch (e) {
            console.warn('Load Failed' + e);
        }
    };
    request.send();
};


// Function on page load to save response from API to local Storage
function localStorageRequest() {
    let _url = path + encodeURIComponent('*');

    const request = new XMLHttpRequest();

    request.open('get', _url, true);

    request.onload = () => {
        try {
            const jsonString = request.responseText;
            localStorage.setItem('stringedTranslations', jsonString);
            loaderFadeToggle();
        } catch (e) {
            console.warn('Load Failed' + e);
        }
    };

    request.send();
}

// Function to serve data to table from local storage based on searched Term in Local Search
function query() {
    let searched = $.trim($('#localStorageSearchInput').val()).toLowerCase();
    console.log(searched);

    prepare();

    let parsedObject = JSON.parse(localStorage.getItem('stringedTranslations'));

    let miniList = parsedObject.filter(function (item) {
        return (item.english.toLowerCase()).includes(searched);
    })

    if (miniList.length == 0) {
        return $('#localStorageSearchTable tbody').append("<tr><td class=\" alert-danger text-center\" colspan = \" 3 \">Search Term matched no results</td></tr>");
    }

    miniList.forEach(item => {
        $('#localStorageSearchTable tbody').append("<tr><td>" + item.code + "</td><td>" + item.english + "</td><td>" + item.description + "</td></tr>");
    })
}


// Function to clear data from table before appending new data
function prepare() {
    $('#localStorageSearchInput').val('');
    $('#localStorageSearchTable tbody').empty();
}


//Function to show preloader
let beforeSend = () => {
    $(table).empty(),
        $('#preloader').toggle();
    $(button).prop('disabled', true);
}

// Function to prevent user from clicking search button when there is no available data in the input
const buttonFormat = () => {

    $(button).prop('disabled', true);
    $(field).keyup(() => {
        $(field).val().length != 0 ? $(button).prop('disabled', false) : $(button).prop('disabled', true);
    });


    $('#localStorageSearchButton').prop('disabled', true);
    $('#localStorageSearchInput').keyup(() => {
        $('#localStorageSearchInput').val().length != 0 ? $('#localStorageSearchButton').prop('disabled', false) : $('#localStorageSearchButton').prop('disabled', true);
    });

}

// Function to allow search when the user presses enter
const enterKey = () => {
    $('#localStorageSearchInput').on("keydown", (event) => {
        event.which == 13 ? $('#localStorageSearchButton').click() : void (0);
    });

    $(field).on("keydown", (event) => {
        event.which == 13 ? $('#submitButton').click() : void (0);
    })
}

// Function To toggle Page Loader upon caching string
const loaderFadeToggle = () => {
    $('#overlay').fadeToggle("fast");
}

//Same
const loaderToggle = () => {
    $('#overlay').toggle();
}

//Function which loads on page start
const pageStarter = () => {
    loaderToggle();
    localStorageRequest();

}

// $('#searchInput').on('keyup', function () {
//     let value = $(this).val().toLowerCase();
//     console.log(value);
//     $('table>tbody>tr').filter(function () {
//         $(this).toggle($(this).text().toLocaleLowerCase().indexOf(value) > -1);
//     });
// });


 // $('.pill1').hover(function(){
    //     $(this).css('border-bottom','2px solid #000080');


    // }, function(){
    //     $(this).css('border-bottom','2px solid #f4f6fa');

    // });

      // $('#dropdownMenuLocal').click(()=>{
    //     $('#menuLocal').toggle();
    //     $('#dropdownMenuLocal #menuLocal').blur(()=>{
    //         $('#menuLocal').toggle();
    //     })
    // })

     // setTimeout(function () {
    //     loaderToggle();
    // },5000);


    // $('#containerAPI').hide();
    // $('#containerLocalStorage').show();