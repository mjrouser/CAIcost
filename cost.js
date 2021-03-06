//duplicate values remove
var data = jsonstr;
var servicesData = jsonstr;
var vendor, min, service, max;

var encodings = {
    "anti_vir": "Anti Virus",
    "wan": "Wide Area Network",
    "sym_connection": "System Connection",
    "firewall": "Fire Wall",
    "filtering": "Filtering",
    "speed": "Speed",
    "vendor": "Vendor",
    "vpn": "VPN",
    "service": "Service",
    "e_rate": "E Rate",
    "_4hr_response": "Lessthan 4 Hour Response",
    "_27_7_support": "24/7 Support",
    "monthly_cost": "Monthly Cost",
    "voip": "Voip"
};

var addOnSettings = {
    "anti_vir": "0",
    "wan": "0",
    "sym_connection": "0",
    "firewall": "0",
    "filtering": "0",
    "vpn": "0",
    "e_rate": "0",
    "_4hr_response": "0",
    "_27_7_support": "0",
    "voip": "0",
};

$(document).ready(function() {

    // Get unique vendor from the list

    var uniqueVendorNames = _.pluck(_.uniq(servicesData, function(obj) {
        return obj.service;
    }), 'service');

    _.each(uniqueVendorNames, function(obj) {
        $("#service_type").append("<li><a>" + obj + "</a></li>");
    });



    $('#service_type a').click(function() {
        $('#range1').show();
        $('#serviceType').html($(this).text() + '<span class="caret"></span>');
        //debugger;
        var selectedServiceObjects = _.where(servicesData, {
            service: $(this).text()
        });

        var selectedServiceTypes = _.pluck(selectedServiceObjects, 'speed');
        //extracting unique elements from the service type
        var uniqueObjects = _.uniq(selectedServiceObjects, function(obj) {
            return obj.speed;
        });
        window.speedRanges = _.pluck(uniqueObjects, 'speed');
        //console.log(selectedServiceObjects);
        _.each(speedRanges, function(obj) {
            $("#bandwidth_range").append("<li><a>" + obj + "</a></li>");
        });
        clearTable();

        $("#bandwidth_range a").click(function() {
            $(this).parents(".input-group-btn").find('.btn').html($(this).text() + '<span class="caret"></span>');
            min = $(this).text();
            maxRange(min, speedRanges);
            clearTable();
            $("#max_bandwidth a").click(function() {
                max = $(this).text();
                $(this).parents(".input-group-btn").find('.btn').html(max + '<span class="caret"></span>');
                $('#toggle').show();
                $('#res').show();
                clearTable();
            });
        });
        clearTable();
    });
});

function maxRange(min, speedRanges) {

    var that = this;
    $("#max_bandwidth").empty();
    _.each(speedRanges, function(obj) {
        if (parseInt(obj) > that.parseInt(min)) {
            $("#max_bandwidth").append("<li><a>" + obj + "</a></li>");
        }
    }, that);
}

function result() {
    $('table').show();
    $("#costData").empty();
    var selectedService = $("#serviceType").text();
    var min = parseInt($("#minSpeed").text());
    var max = parseInt($("#maxSpeed").text());

    var that = this;

    window.speedRangeSeviceObjects = [];
    _.each(servicesData, function(obj) {

        if ((obj.service == selectedService) && (parseInt(obj.speed) > that.parseInt(min)) && (parseInt(obj.speed) < that.parseInt(max))) {
            window.speedRangeSeviceObjects.push(obj);
            var matchedAddOns = '';
            for (var prop in obj) {
                if (obj[prop] == "1") {

                    matchedAddOns = matchedAddOns + window.encodings[prop] + ',';
                }
            }

            $("#costData").append("<tr>" + "<td >" + obj.vendor + "</td>" + "<td>" + obj.service + "</td>" + "<td>" + obj.speed + "</td>" + "<td>" + obj.monthly_cost + "</td>" +
                "<td>" + matchedAddOns + "</td>" + "</tr>");
        }
    }, that);
    jQuery('#costtable').dataTable();
}


//check box functionality
var allcheck = [];
$('.customservice').change(function() {

    $("#costData").empty();
    var propName = $(this).attr('id');
    window.addOnSettings[propName] = $('#' + propName).is(':checked') ? "1" : "0";

    renderTableOverride();
});

function renderTableOverride() {
    var selectedService = $("#serviceType").text();
    var min = parseInt($("#minSpeed").text());
    var max = parseInt($("#maxSpeed").text());

    var that = this;
    window.speedRangeSeviceObjects = [];
    _.each(servicesData, function(obj) {

        if ((obj.service == selectedService) && (parseInt(obj.speed) > that.parseInt(min)) && (parseInt(obj.speed) < that.parseInt(max))) {
            window.speedRangeSeviceObjects.push(obj);
            var matchedAddOns = '';
            var matchedAddOns2 = '';
            //  var matchedAddOns1 = '';
            for (var prop in obj) {

                if (obj[prop] == "1") {

                    if (window.addOnSettings[prop] == "1") {

                        matchedAddOns = matchedAddOns + window.encodings[prop] + ',';
                    } else {
                        matchedAddOns = matchedAddOns + window.encodings[prop] + ',';
                    }

                }

            }

            for (var prop in obj) {

                if (obj[prop] == "1" || window.addOnSettings[prop] == "1") {

                    matchedAddOns2 = matchedAddOns;
                }
            }



            $("#costData").append("<tr>" + "<td >" + obj.vendor + "</td>" + "<td>" + obj.service + "</td>" + "<td>" + obj.speed + "</td>" + "<td>" + obj.monthly_cost + "</td>" +
                "<td>" + matchedAddOns2 + "</td>" + "</tr>");


        }
    }, that);
    checkboxChecking();
    tableColumn();
    arrayMatching();
}


function clearTable() {
    var tsize = $("#costData tr").size();
    if (tsize > 0) {
        $("#costData").empty();
        result();
    }
}

function checkboxChecking() {
    window.emptyArray = [];
    for (key in addOnSettings) {
        window.addOnSettings[key] = $('#' + key).is(':checked') ? "1" : "0";
        if (window.addOnSettings[key] == 1) {

            window.emptyArray.push(window.encodings[key]);
        }
    }
}

var foo = [];

function tableColumn() {

    window.addOnList = [];
    //debugger;
    var table = document.getElementById("costtable");

    window.rows = table.querySelectorAll("tr");
    var cells = table.querySelectorAll("td");
    for (i = 4; i < cells.length; i += 5) {
        window.extracted_list = cells[i].innerText.split(",");
        addOnList.push(window.extracted_list);
    }

}

function arrayMatching() {
    foo = [];

    for (k = 0; k < addOnList.length; k++) {
        window.foo[k] = [];
        for (i = 0; i < emptyArray.length; i++) {

            for (j = 0; j < addOnList[k].length; j++) {

                if (emptyArray[i].toLowerCase() == addOnList[k][j].toLowerCase()) {
                    foo[k].push(addOnList[k][j]);
                    console.log(foo);
                }

            }

        }
    }
    //debugger;
    window.matched_rows = [];
    window.unmatched_rows = [];
    for (q = 0; q < foo.length; q++) {
        if (emptyArray.length == foo[q].length) {
            matched_rows.push(q);
            console.log("Matchiung rows count" + q);
        } else {
            unmatched_rows.push(q);

        }
    }
    //adding color values 
    for (i = 1; i < window.rows.length; i++) {

        for (j = 0; j < matched_rows.length; j++) {
            if ((i - 1) == matched_rows[j]) {
                $(rows[i]).css("color", "black");
                 $(rows[i]).css("font-weight", "bold");
            }
        }
    }

}