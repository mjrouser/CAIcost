var stext, ss, service;
		$(document).ready(function () {
		 var aa = jsonstr;
		    for (var i = 0; i < aa.length; i++) {
		  $("#vendor_type").append("<li><a>" + aa[i].vendor + "</a></li>");
		 $('#vendor_type').each(function() {
                            var seen = {};
                            $(this).children('li').each(function() {
                                var txt = $(this).text();
                                if (seen[txt])
                                    $(this).remove();
                                else
                                // debugger;
                                    seen[txt] = true;
                            });
                        });
		
		}
		
		
            
            $('.dropdown-menu li a').click(function() {
			$('#service2').show();
                $(this).parents(".input-group-btn").find('.btn').html($(this).text() + '&nbsp;&nbsp;<span class="caret"></span>');
                stext = $(this).text();
                //(this).parents('.btn-group').find('.dropdown-menu li a').html(stext+'<span class="caret"></span>');

                var aa = jsonstr;
                //debugger;

                for (var i = 0; i < aa.length; i++) {
                    if (aa[i].vendor == stext) {
                        //Retrieving service data
                        $("#service_type").append("<li><a>" + aa[i].service + "</a></li>");

                        //Removing duplicates from the list
                        $('#service_type').each(function() {
                            var seen = {};
                            $(this).children('li').each(function() {
                                var txt = $(this).text();
                                if (seen[txt])
                                    $(this).remove();
                                else
                                // debugger;
                                    seen[txt] = true;
                            });
                        });


                        $("#service_type a").click(function() {
                            //debugger;
							$('#range1').show();
                            service = $(this).text();
                            $(this).parents(".input-group-btn").find('.btn').html($(this).text() + '&nbsp;&nbsp;<span class="caret"></span>');

                        });
                        //retrieving the speed information		
                        //Todo separate the internet and passthrough values
                        $("#bandwidth_range").append("<li><a>" + aa[i].speed + "</a></li>");

                        //Removing the duplicates
                        $('#bandwidth_range').each(function() {
                            var seen = {};
                            $(this).children('li').each(function() {
                                var txt = $(this).text();
                                if (seen[txt])
                                    $(this).remove();
                                else
                                // debugger;
                                    seen[txt] = true;
                            });
                        });

                        $("#bandwidth_range a").click(function() {
                            //debugger;
							$('#toggle').show();
							$('#res').show();
                            $(this).parents(".input-group-btn").find('.btn').html($(this).text() + '&nbsp;&nbsp;<span class="caret"></span>');
                            ss = $(this).text();
                            //alert(ss);
                        });

                        //Check-box information
                        $("#c_support").prop("checked", aa[i]._27_7_support);
                        $("#sys_connection").prop("checked", aa[i].sym_connection);
                        $("#hresponse").prop("checked", aa[i]._4hr_response);
                        $("#vpn").prop("checked", aa[i].vpn);
                        $("#WAN").prop("checked", aa[i].WAN);
                        $("#e_rate").prop("checked", aa[i].e_rate);
                        $("#fwall").prop("checked", aa[i].Firewall);
                        $("#filtering").prop("checked", aa[i].filtering);
                        $("#voip").prop("checked", aa[i].voip);
                    }
                }

            });
           
			});
			
			function result() {
                $('table').show();
                var data = jsonstr;
                //debugger;
                for (var i = 0; i < data.length; i++) {
                    if (ss == data[i].speed && service == data[i].service) {
                        $("#comp1").append("<tr>" + "<td>" + data[i].vendor + "</td>" +"<td>" + data[i].service + "</td>" + "<td>" + data[i].speed + "</td>" +"<td>" + data[i].monthly_cost + "</td>" + "</tr>");
                    }
                }
            }