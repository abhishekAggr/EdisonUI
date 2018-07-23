var PortletTools = function () {
    //== Toastr
    var initToastr = function() {
        toastr.options.showDuration = 1000;
    }

    //== Demo 1
    var demo1 = function() {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_1');

        //== Toggle event handlers
        portlet.on('beforeCollapse', function(portlet) {
            setTimeout(function() {
                toastr.info('Before collapse event fired!');
            }, 100);
        });

        portlet.on('afterCollapse', function(portlet) {
            setTimeout(function() {
                toastr.warning('Before collapse event fired!');
            }, 2000);            
        });

        portlet.on('beforeExpand', function(portlet) {
            setTimeout(function() {
                toastr.info('Before expand event fired!');
            }, 100);  
        });

        portlet.on('afterExpand', function(portlet) {
            setTimeout(function() {
                toastr.warning('After expand event fired!');
            }, 2000);
        });

        //== Remove event handlers
        portlet.on('beforeRemove', function(portlet) {
            toastr.info('Before remove event fired!');

            return confirm('Are you sure to remove this portlet ?');  // remove portlet after user confirmation
        });

        portlet.on('afterRemove', function(portlet) {
            setTimeout(function() {
                toastr.warning('After remove event fired!');
            }, 2000);            
        });

        //== Reload event handlers
        portlet.on('reload', function(portlet) {
            toastr.info('Leload event fired!');

            mApp.block(portlet.getSelf(), {
                overlayColor: '#ffffff',
                type: 'loader',
                state: 'accent',
                opacity: 0.3,
                size: 'lg'
            });

            // update the content here

            setTimeout(function() {
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });

        //== Reload event handlers
        portlet.on('afterFullscreenOn', function(portlet) {
            toastr.warning('After fullscreen on event fired!');    
            var scrollable = $(portlet.getBody()).find('> .m-scrollable');

            if (scrollable) {
                scrollable.data('original-height', scrollable.css('height'));
                scrollable.css('height', '100%');
                
                mUtil.scrollerUpdate(scrollable[0]);
            }
        });

        portlet.on('afterFullscreenOff', function(portlet) {
            toastr.warning('After fullscreen off event fired!');    
            var scrollable = $(portlet.getBody()).find('> .m-scrollable');

            if (scrollable) {
                var scrollable = $(portlet.getBody()).find('> .m-scrollable');
                scrollable.css('height', scrollable.data('original-height'));

                mUtil.scrollerUpdate(scrollable[0]);
            }
        });
    }

    //== Demo 2
    var demo2 = function() {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_2');

        //== Toggle event handlers
        portlet.on('beforeCollapse', function(portlet) {
            setTimeout(function() {
                toastr.info('Before collapse event fired!');
            }, 100);
        });

        portlet.on('afterCollapse', function(portlet) {
            setTimeout(function() {
                toastr.warning('Before collapse event fired!');
            }, 2000);            
        });

        portlet.on('beforeExpand', function(portlet) {
            setTimeout(function() {
                toastr.info('Before expand event fired!');
            }, 100);  
        });

        portlet.on('afterExpand', function(portlet) {
            setTimeout(function() {
                toastr.warning('After expand event fired!');
            }, 2000);
        });

        //== Remove event handlers
        portlet.on('beforeRemove', function(portlet) {
            toastr.info('Before remove event fired!');

            return confirm('Are you sure to remove this portlet ?');  // remove portlet after user confirmation
        });

        portlet.on('afterRemove', function(portlet) {
            setTimeout(function() {
                toastr.warning('After remove event fired!');
            }, 2000);            
        });

        //== Reload event handlers
        portlet.on('reload', function(portlet) {
            toastr.info('Leload event fired!');

            mApp.block(portlet.getSelf(), {
                overlayColor: '#000000',
                type: 'spinner',
                state: 'brand',
                opacity: 0.05,
                size: 'lg'
            });

            // update the content here

            setTimeout(function() {
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });
    }

    //== Demo 3
    var demo3 = function() {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_3');

        //== Toggle event handlers
        portlet.on('beforeCollapse', function(portlet) {
            setTimeout(function() {
                toastr.info('Before collapse event fired!');
            }, 100);
        });

        portlet.on('afterCollapse', function(portlet) {
            setTimeout(function() {
                toastr.warning('Before collapse event fired!');
            }, 2000);            
        });

        portlet.on('beforeExpand', function(portlet) {
            setTimeout(function() {
                toastr.info('Before expand event fired!');
            }, 100);  
        });

        portlet.on('afterExpand', function(portlet) {
            setTimeout(function() {
                toastr.warning('After expand event fired!');
            }, 2000);
        });

        //== Remove event handlers
        portlet.on('beforeRemove', function(portlet) {
            toastr.info('Before remove event fired!');

            return confirm('Are you sure to remove this portlet ?');  // remove portlet after user confirmation
        });

        portlet.on('afterRemove', function(portlet) {
            setTimeout(function() {
                toastr.warning('After remove event fired!');
            }, 2000);            
        });

        //== Reload event handlers
        portlet.on('reload', function(portlet) {
            toastr.info('Leload event fired!');

            mApp.block(portlet.getSelf(), {
                type: 'loader',
                state: 'success',
                message: 'Please wait...'
            });

            // update the content here

            setTimeout(function() {
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });

        //== Reload event handlers
        portlet.on('afterFullscreenOn', function(portlet) {
            toastr.warning('After fullscreen on event fired!');    
            var scrollable = $(portlet.getBody()).find('> .m-scrollable');

            if (scrollable) {
                scrollable.data('original-height', scrollable.css('height'));
                scrollable.css('height', '100%');
                
                mUtil.scrollerUpdate(scrollable[0]);
            }
        });

        portlet.on('afterFullscreenOff', function(portlet) {
            toastr.warning('After fullscreen off event fired!');    
            var scrollable = $(portlet.getBody()).find('> .m-scrollable');

            if (scrollable) {
                var scrollable = $(portlet.getBody()).find('> .m-scrollable');
                scrollable.css('height', scrollable.data('original-height'));

                mUtil.scrollerUpdate(scrollable[0]);
            }
        });
    }
 
    //== Demo 4
    var demo4 = function() {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_4');
        progress_bar();

       
        //== Reload event handlers
        portlet.on('reload', function(portlet) {
            toastr.info('Leload event fired!');

            mApp.block(portlet.getSelf(), {
                type: 'loader',
                state: 'brand',
                message: 'Please wait...'
            });

            // update the content here

            setTimeout(function() {
                progress_bar();
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });

        //== Reload event handlers
        portlet.on('afterFullscreenOn', function(portlet) {
            toastr.warning('After fullscreen on event fired!');    
            var scrollable = $(portlet.getBody()).find('> .m-scrollable');

            if (scrollable) {
                scrollable.data('original-height', scrollable.css('height'));
                scrollable.css('height', '100%');
                
                mUtil.scrollerUpdate(scrollable[0]);
            }
        });

        portlet.on('afterFullscreenOff', function(portlet) {
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
    var last_months_chart_portlet = function() {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_5');
        last_months_chart();
       
        //== Reload event handlers
        portlet.on('reload', function(portlet) {
            toastr.info('Leload event fired!');

            mApp.block(portlet.getSelf(), {
                type: 'loader',
                state: 'brand',
                message: 'Please wait...'
            });

            // update the content here


            setTimeout(function() {
                $("#m_morris_3").empty();
                last_months_chart();
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });
    }


    // == Last 16 months chart
    var last_months_chart = function() {
        var json = (function () {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': 'assets/json/chart_sixteen_months.json',
                'dataType': "json",
                'success': function (data) {
                    json = data;
                }
            });
            return json;
        })
        ();
        // BAR CHART
      var morisBarChart =  new Morris.Bar({
            element: 'm_morris_3',
            data: json,
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Series A']
        });
      //  return morisBarChart;
    }

    //== Five Year Chart
        var chart_five_year = function() {

        var json = (function () {
            var json = null;
            $.ajax({
                'async': false,
                'global': false,
                'url': 'assets/json/chart_five_year.json',
                'dataType': "json",
                'success': function (data) {
                    json = data;
                }
            });
            return json;
        })
        ();


        //== AREA CHART
        new Morris.Area({
            element: 'm_morris_2',
            data: json,
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Series A']
        });
    }

    // == Five Year Chart Portlet
    var chart_five_year_portlet = function() {
        // This portlet is lazy initialized using data-portlet="true" attribute. You can access to the portlet object as shown below and override its behavior
        var portlet = new mPortlet('m_portlet_tools_5');
        chart_five_year();

        //== Reload event handlers
        portlet.on('reload', function(portlet) {
            toastr.info(' Leload event fired!');

            mApp.block(portlet.getSelf(), {
                type: 'loader',
                state: 'brand',
                message: 'Please wait...'
            });

            // update the content here


            setTimeout(function() {
                $("#m_morris_2").empty();
                chart_five_year();
                mApp.unblock(portlet.getSelf());
            }, 2000);
        });
    }


    //Progress Bar Portlet
    var progress_bar = function(){

        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': 'assets/json/progress-bar.json',
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        //toastr.info('Before collapse event fired!'+json[0].start + "---"+json[0].end);

        var current_progress = 0;
        //Calculate percentage for progress bar
        current_progress = (json[0].value*100)/(json[0].end-json[0].start);

        //Round off the progress
        current_progress = current_progress.toFixed(); 

        var css_class = "";
       
            
            if(current_progress>50){
               css_class = " bg-success";
            }else{
                css_class ="bg-warning";
            }

            $("#dynamic")
            .css("width", current_progress + "%")
            .attr("aria-valuenow", current_progress)
            .removeClass()
            .addClass("progress-bar  progress-bar-striped active"+ css_class);
          //  .text(current_progress + "% Complete");
           
          $("#progress-bar-start").text( json[0].currency+" "+json[0].start);
          $("#progress-bar-value").text(json[0].currency+" "+json[0].value);
          $("#progress-bar-end").text(json[0].currency+" "+json[0].end);
          $("#invc-count").text(json[0].invc_count);
          $("#invc-overdue-date").text(json[0].invc_overdue_date);
          $("#overdue").text(json[0].overdue);

         
       
    }

    return {
        //main function to initiate the module
        init: function () {
            initToastr();

            // init demos
            demo1();
            demo2();
            demo3();
            demo4();
            last_months_chart_portlet();
            chart_five_year_portlet();
            
            
        }
    };
}();

jQuery(document).ready(function() {
    PortletTools.init();
});