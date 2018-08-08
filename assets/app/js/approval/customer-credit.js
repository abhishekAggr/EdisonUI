var PortletTools = function () {
    //== Toastr
    var initToastr = function () {
        toastr.options.showDuration = 1000;
    }

    var pageSetup = function () {
        //var json = null;
        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/customer_credit/customer_credit.json',
            'dataType': "json",
            'success': function (data) {
                renderPageTitle(data[0].pageTitle);
                renderBreadcrumbs(data[0].breadCrums);
                renderButtons(data[0].buttons);
                $(".breadcrumbs").on('click',function(e){
					e.preventDefault();
					if($(this).attr('href')!="" && ($(this).attr('href')!='#')){
						$("#page").load($(this).attr('href'));
					}
					return false;
                });
                
                $(".accept").on('click',function(e){
					//TODO :: Approve Action call here
					$("#page").load('profitmargin.html');
				}); 
				$(".hold").on('click',function(e){
					//TODO :: Hold Action call here
					$("#page").load('profitmargin.html');
				}); 
				$(".reject").on('click',function(e){
					//TODO :: Reject Action call here
					$("#page").load('profitmargin.html');
				}); 


            }

        });
    }

    var renderPageTitle = function (title) {
        $("#page-title").text(title);
    }
    var renderBreadcrumbs = function (data) {
        $("#breadcrumb").html("");
        $.each(data, function (key, value) {
            $("#breadcrumb").append(`
			<li class="m-nav__item">
							<a href="${value.link}" class="m-nav__link breadcrumbs">
								<span class="m-nav__link-text m--font-darkblue">${value.title}</span>
							</a>
						</li>`);

            if (value.saperator == "1") {
                $("#breadcrumb").append(` <li class="m-nav__separator">></li>`);
            }


        });
    }

    var renderButtons = function (data) {
        $("#buttons").html("");
        //"0":{"class":"info","icon":"la la-check","text":"Approve","text_class":"m--icon-font-size-sm5"},
        $.each(data, function (key, value) {
            $("#buttons").append(`<button type="button" class="btn m-btn--pill m--padding-top-5 m--padding-bottom-5 ${value.class} btn-sm m-btn m-btn--custom">
            <i class="${value.icon}"></i>
            <span class="${value.text_class}">${value.text}</span>
        </button>`);
        });
    }
    //== Approval Portlet Rendering
    var renderApprovalPortler = function () {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_1');
        approval();
        //== Toggle event handlers
        portlet.on('beforeCollapse', function (portlet) {
            setTimeout(function () {
                toastr.info('Before collapse event fired!');
            }, 100);
        });

        portlet.on('afterCollapse', function (portlet) {
            setTimeout(function () {
                toastr.warning('Before collapse event fired!');
            }, 2000);
        });

        portlet.on('beforeExpand', function (portlet) {
            setTimeout(function () {
                toastr.info('Before expand event fired!');
            }, 100);
        });

        portlet.on('afterExpand', function (portlet) {
            setTimeout(function () {
                toastr.warning('After expand event fired!');
            }, 2000);
        });

        //== Remove event handlers
        portlet.on('beforeRemove', function (portlet) {
            toastr.info('Before remove event fired!');

            return confirm('Are you sure to remove this portlet ?'); // remove portlet after user confirmation
        });

        portlet.on('afterRemove', function (portlet) {
            setTimeout(function () {
                toastr.warning('After remove event fired!');
            }, 2000);
        });

        //== Reload event handlers
        portlet.on('reload', function (portlet) {
            toastr.info('Reload event fired!');
            approval();
            mApp.block(portlet.getSelf(), {
                type: 'loader',
                state: 'success',
                message: 'Please wait...'
            });

            // update the content here

            setTimeout(function () {
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });

        //== Reload event handlers
        portlet.on('afterFullscreenOn', function (portlet) {
            toastr.warning('After fullscreen on event fired!');
            var scrollable = $(portlet.getBody()).find('> .m-scrollable');

            if (scrollable) {
                scrollable.data('original-height', scrollable.css('height'));
                scrollable.css('height', '100%');

                mUtil.scrollerUpdate(scrollable[0]);
            }
        });

        portlet.on('afterFullscreenOff', function (portlet) {
            toastr.warning('After fullscreen off event fired!');
            var scrollable = $(portlet.getBody()).find('> .m-scrollable');

            if (scrollable) {
                var scrollable = $(portlet.getBody()).find('> .m-scrollable');
                scrollable.css('height', scrollable.data('original-height'));

                mUtil.scrollerUpdate(scrollable[0]);
            }
        });
    }

    //== Credit Portlet Rendering
    var renderCreditPortlet = function () {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_2');
        credit();
        //== Toggle event handlers
        portlet.on('beforeCollapse', function (portlet) {
            setTimeout(function () {
                toastr.info('Before collapse event fired!');
            }, 100);
        });

        portlet.on('afterCollapse', function (portlet) {
            setTimeout(function () {
                toastr.warning('Before collapse event fired!');
            }, 2000);
        });

        portlet.on('beforeExpand', function (portlet) {
            setTimeout(function () {
                toastr.info('Before expand event fired!');
            }, 100);
        });

        portlet.on('afterExpand', function (portlet) {
            setTimeout(function () {
                toastr.warning('After expand event fired!');
            }, 2000);
        });

        //== Remove event handlers
        portlet.on('beforeRemove', function (portlet) {
            toastr.info('Before remove event fired!');

            return confirm('Are you sure to remove this portlet ?'); // remove portlet after user confirmation
        });

        portlet.on('afterRemove', function (portlet) {
            setTimeout(function () {
                toastr.warning('After remove event fired!');
            }, 2000);
        });

        //== Reload event handlers
        portlet.on('reload', function (portlet) {
            toastr.info('Reload event fired!');

            mApp.block(portlet.getSelf(), {
                overlayColor: '#ffffff',
                type: 'loader',
                state: 'accent',
                opacity: 0.3,
                size: 'lg'
            });

            // update the content here

            setTimeout(function () {
                credit();
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });

        //== Reload event handlers
        portlet.on('afterFullscreenOn', function (portlet) {
            toastr.warning('After fullscreen on event fired!');
            var scrollable = $(portlet.getBody()).find('> .m-scrollable');

            if (scrollable) {
                scrollable.data('original-height', scrollable.css('height'));
                scrollable.css('height', '100%');

                mUtil.scrollerUpdate(scrollable[0]);
            }
        });

        portlet.on('afterFullscreenOff', function (portlet) {
            toastr.warning('After fullscreen off event fired!');
            var scrollable = $(portlet.getBody()).find('> .m-scrollable');

            if (scrollable) {
                var scrollable = $(portlet.getBody()).find('> .m-scrollable');
                scrollable.css('height', scrollable.data('original-height'));

                mUtil.scrollerUpdate(scrollable[0]);
            }
        });
    }

    //== Render Customer Portlet
    var renderCustomerPortlet = function () {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_3');
        customer();
        //== Toggle event handlers
        portlet.on('beforeCollapse', function (portlet) {
            setTimeout(function () {
                toastr.info('Before collapse event fired!');
            }, 100);
        });

        portlet.on('afterCollapse', function (portlet) {
            setTimeout(function () {
                toastr.warning('Before collapse event fired!');
            }, 2000);
        });

        portlet.on('beforeExpand', function (portlet) {
            setTimeout(function () {
                toastr.info('Before expand event fired!');
            }, 100);
        });

        portlet.on('afterExpand', function (portlet) {
            setTimeout(function () {
                toastr.warning('After expand event fired!');
            }, 2000);
        });

        //== Remove event handlers
        portlet.on('beforeRemove', function (portlet) {
            toastr.info('Before remove event fired!');

            return confirm('Are you sure to remove this portlet ?'); // remove portlet after user confirmation
        });

        portlet.on('afterRemove', function (portlet) {
            setTimeout(function () {
                toastr.warning('After remove event fired!');
            }, 2000);
        });

        //== Reload event handlers
        portlet.on('reload', function (portlet) {
            toastr.info('Reload event fired!');

            mApp.block(portlet.getSelf(), {
                overlayColor: '#000000',
                type: 'spinner',
                state: 'brand',
                opacity: 0.05,
                size: 'lg'
            });

            // update the content here

            setTimeout(function () {
                customer();
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });
    }

    //== Open AMount Portlet with progressBar
    var renderOpenAmountPortlet = function () {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_4');
        progress_bar();

        //== Reload event handlers
        portlet.on('reload', function (portlet) {
            toastr.info('Reload event fired!');

            mApp.block(portlet.getSelf(), {
                type: 'loader',
                state: 'brand',
                message: 'Please wait...'
            });

            // update the content here

            setTimeout(function () {
                progress_bar();
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });

        //== Reload event handlers
        portlet.on('afterFullscreenOn', function (portlet) {
            toastr.warning('After fullscreen on event fired!');
            var scrollable = $(portlet.getBody()).find('> .m-scrollable');

            if (scrollable) {
                scrollable.data('original-height', scrollable.css('height'));
                scrollable.css('height', '100%');

                mUtil.scrollerUpdate(scrollable[0]);
            }
        });

        portlet.on('afterFullscreenOff', function (portlet) {
            toastr.warning('After fullscreen off event fired!');
            var scrollable = $(portlet.getBody()).find('> .m-scrollable');

            if (scrollable) {
                var scrollable = $(portlet.getBody()).find('> .m-scrollable');
                scrollable.css('height', scrollable.data('original-height'));

                mUtil.scrollerUpdate(scrollable[0]);
            }
        });
    }

    //== last_months_chart_portlet
    var renderLastMonthsChartPortlet = function () {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_5');
        last_months_chart();

        //== Reload event handlers
        portlet.on('reload', function (portlet) {
            toastr.info('Reload event fired!');

            mApp.block(portlet.getSelf(), {
                type: 'loader',
                state: 'brand',
                message: 'Please wait...'
            });

            // update the content here


            setTimeout(function () {
                $("#m_morris_3").empty();
                last_months_chart();
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });
    }

    // == Last 16 months chart
    var last_months_chart = function () {
        var json = (function () {
                var json = null;
                $.ajax({
                    'async': true,
                    'global': false,
                    'url': 'json/customer_credit/chart_sixteen_months.json',
                    'dataType': "json",
                    'success': function (data) {
                        json = data;
                        // BAR CHART
                        var morisBarChart = new Morris.Bar({
                            element: 'm_morris_3',
                            data: json,
                            xkey: 'y',
                            ykeys: ['a'],
                            labels: ['Series A']
                        });
                    }
                });
                return json;
            })
            ();

        //  return morisBarChart;
    }

    // == Five Year Chart Portlet
    var renderLastFiveYearChartPortlet = function () {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_6');
        chart_five_year();

        //== Reload event handlers
        portlet.on('reload', function (portlet) {
            toastr.info(' Reload event fired!');

            mApp.block(portlet.getSelf(), {
                type: 'loader',
                state: 'brand',
                message: 'Please wait...'
            });

            // update the content here


            setTimeout(function () {
                $("#m_morris_2").empty();
                chart_five_year();
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });
    }

    //== Five Year Chart
    var chart_five_year = function () {

        var json = (function () {
                var json = null;
                $.ajax({
                    'async': true,
                    'global': false,
                    'url': 'json/customer_credit/chart_five_year.json',
                    'dataType': "json",
                    'success': function (data) {
                        json = data;
                        //== AREA CHART
                        new Morris.Area({
                            element: 'm_morris_2',
                            data: json,
                            xkey: 'y',
                            ykeys: ['a'],
                            labels: ['Series A']
                        });
                    }
                });
                return json;
            })
            ();



    }

    var setStatus = function (statusid) {

        var status = {
            1: {
                'title': 'Pending',
                'class': 'gray'
            },
            2: {
                'title': 'On Hold',
                'class': 'info'
            },

        };

        $('#status').html(`<span class=" btn m--valign-top m--icon-font-size-sm5  btn-${status[statusid].class} m-btn btn-sm m-btn--icon m-btn--pill py-sm-0">
	${status[statusid].title}
</span>`);
    }


    var approval = function () {
        var json = null;
        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/customer_credit/credit_detail.json',
            'dataType': "json",
            'success': function (data) {
                json = data;
                $.each(json, function (i, val) {

                    var approvalHTML = "";
        
                    $.each(val['approval'], function (k, value) {
        
                        var leftWidth = "3";
                        var rightWidth = "9";
        
                        approvalHTML = approvalHTML + `<div class="col-lg-${leftWidth} col-md-${leftWidth} col-sm-${leftWidth}  m--font-thin m--padding-5"  >${k}:</div>
                        <div class="col-lg-${rightWidth} col-md-${rightWidth} col-sm-${rightWidth} m--padding-5 m--font-bold" >
                        ${value}
                        </div>`;
        
                    });
                    $("#approval").html(approvalHTML);
                });
            }
        });




    }

    var credit = function () {
        var json = null;
        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/customer_credit/credit_detail.json',
            'dataType': "json",
            'success': function (data) {
                json = data;
                $.each(json, function (i, val) {

                    var creditTopHTML = "";
                    var crediBottomtHTML = "";
                    var count = 1;
                    $.each(val['credit'], function (k, value) {
        
                        //crediBottomtHTML += `<div class="${value.label_class}">${value.label}</div><div class="${value.value_class}">${value.value}</div>`;
        
                        if (count <= 4) {
                            creditTopHTML += `<div class="${value.label_class}">${value.label}<br/><span class="${value.value_class}">${value.value}</span></div>`;
                        } else {
                            crediBottomtHTML += `<div class="${value.label_class}">${value.label}</div><div class="${value.value_class}">${value.value}</div>`;
                        }
                        count++;
        
                    });
        
                    $("#credit_header_row").html(creditTopHTML);
                    $("#credit_header_row").append(`<div class="m--space-20 col-lg-12 col-md-12 col-sm-12"></div>`);
                    $("#credit_header_row").append(crediBottomtHTML);
                });
            }
        });




    }

    var customer = function () {
        var json = null;
        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/customer_credit/credit_detail.json',
            'dataType': "json",
            'success': function (data) {
                json = data;
                $.each(json, function (i, val) {
                    setStatus(val.status);
                    var customerHTML = "";
                    var count = 1;
                    $.each(val['customer'], function (k, value) {
        
                        var keyClass;
                        var valueClass;
                        if (count % 2 == 0) {
                            keyClass = "col-lg-3 col-md-3 col-sm-3";
                            valueClass = "col-lg-3 col-md-3 col-sm-3";
                        } else {
                            keyClass = "col-lg-2 col-md-2 col-sm-2";
                            valueClass = "col-lg-4  col-md-4 col-sm-4";
                        }
                        customerHTML = customerHTML + `<div class="${keyClass}  m--font-thin m--padding-5"  >${k}:</div>
                        <div class="${valueClass}  m--padding-5 m--font-bold" >
                        ${value}
                        </div>`;
                        count++;
                    });
                    $("#customer").html(customerHTML);
                });
            }
        });




    }


    //Progress Bar 
    var progress_bar = function () {

        var json = null;
        $.ajax({
            'async': true,
            'global': false,
            'url': 'json/customer_credit/progress_bar.json',
            'dataType': "json",
            'success': function (data) {
                json = data;
                var current_progress = 0;
                //Calculate percentage for progress bar
                current_progress = (json[0].value * 100) / (json[0].end - json[0].start);
        
                //Round off the progress
                current_progress = current_progress.toFixed();
        
                var css_class = "";
        
        
                if (current_progress > 50) {
                    css_class = " bg-success";
                } else {
                    css_class = "bg-warning";
                }
        
                $("#dynamic")
                    .css("width", current_progress + "%")
                    .attr("aria-valuenow", current_progress)
                    .removeClass()
                    .addClass("progress-bar  progress-bar-striped active" + css_class);
                //  .text(current_progress + "% Complete");
        
                $("#progress-bar-start").text(json[0].currency + " " + json[0].start);
                $("#progress-bar-value").text(json[0].currency + " " + json[0].value);
                $("#progress-bar-end").text(json[0].currency + " " + json[0].end);
                $("#invc-count").text(json[0].invc_count);
                $("#invc-overdue-date").text(json[0].invc_overdue_date);
                $("#overdue").text(json[0].overdue);
            }
        });





    }

    return {
        //main function to initiate the module
        init: function () {
            initToastr();
            pageSetup();
            renderApprovalPortler();
            renderCreditPortlet();
            renderCustomerPortlet();
            renderOpenAmountPortlet();
            renderLastMonthsChartPortlet();
            renderLastFiveYearChartPortlet();
        }
    };
}();

jQuery(document).ready(function () {
    PortletTools.init();
});