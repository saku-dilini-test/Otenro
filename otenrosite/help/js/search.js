$(function(){
  var data = [  
      //general
     {  
        "heading":"Change the Password",
        "path":"general.html",
        "selectedid":"collapse1"
     },

     //commerce_settings
     {  
        "heading":"Add Products",
        "path":"commerce_settings.html",
        "selectedid":"collapse1"
     },
     {  
        "heading":"What is an SKU?",
        "path":"commerce_settings.html",
        "selectedid":"collapse2"
     },
     {  
        "heading":"Editing a product",
        "path":"commerce_settings.html",
        "selectedid":"collapse3"
     },

     //style_settings

     {  
        "heading":"Style Settings",
        "path":"style_settings.html",
        "selectedid":"collapse1"
     },
     {  
        "heading":"Change background image",
        "path":"style_settings.html",
        "selectedid":"collapse2"
     },
     {  
        "heading":"Change Background Colour",
        "path":"style_settings.html",
        "selectedid":"collapse3"
     },
     {  
        "heading":"Changen Header Font",
        "path":"style_settings.html",
        "selectedid":"collapse4"
     },
     {  
        "heading":"Change content font",
        "path":"style_settings.html",
        "selectedid":"collapse6"
     },
     {  
        "heading":"Navigation",
        "path":"style_settings.html",
        "selectedid":"collapse7"
     },

     //catagories

     {  
        "heading":"Create Catagories",
        "path":"catagories.html",
        "selectedid":"collapse6"
     },
     {  
        "heading":"Delete a category",
        "path":"catagories.html",
        "selectedid":"collapse7"
     },
     {  
        "heading":"Edit a category",
        "path":"catagories.html",
        "selectedid":"collapse8"
     },

     //order_settings

     {  
        "heading":"View an order",
        "path":"order_settings.html",
        "selectedid":"collapse1"
     },
     {  
        "heading":"View fulfilled orders",
        "path":"order_settings.html",
        "selectedid":"collapse2"
     },
     {  
        "heading":"Unfulfilled orders",
        "path":"order_settings.html",
        "selectedid":"collapse3"
     },
     {  
        "heading":"Refunded orders",
        "path":"order_settings.html",
        "selectedid":"collapse4"
     },

     //inventory

     {  
        "heading":"Define low inventory alert level",
        "path":"inventory.html",
        "selectedid":"collapse1"
     },
     {  
        "heading":"Delete a product",
        "path":"inventory.html",
        "selectedid":"collapse2"
     },
     {  
        "heading":"Delete a product variant",
        "path":"inventory.html",
        "selectedid":"collapse3"
     },
     {  
        "heading":"Edit the quantity of a product",
        "path":"inventory.html",
        "selectedid":"collapse4"
     },
     {  
        "heading":"Edit the Price of a product",
        "path":"inventory.html",
        "selectedid":"collapse5"
     },

     //tax_settings

     {  
        "heading":"Create a Tax rule",
        "path":"tax_settings.html",
        "selectedid":"collapse1"
     },
     {  
        "heading":"Edit a Tax Option?",
        "path":"tax_settings.html",
        "selectedid":"collapse2"
     },
     {  
        "heading":"Delete a Tax Option?",
        "path":"tax_settings.html",
        "selectedid":"collapse3"
     },

     //email

     {  
        "heading":"Set the email address that sends order confirmation emails to customers",
        "path":"email.html",
        "selectedid":"collapse1"
     },
     {  
        "heading":"Define the reply to address for your emails",
        "path":"email.html",
        "selectedid":"collapse2"
     },
     {  
        "heading":"Set the logo for emails sent to customers",
        "path":"email.html",
        "selectedid":"collapse3"
     },
     {  
        "heading":"Send a test Email",
        "path":"email.html",
        "selectedid":"collapse4"
     },

     //shipping

     {  
        "heading":"Create a shipping option",
        "path":"shipping.html",
        "selectedid":"collapse1"
     },
     {  
        "heading":"Define Flat Rate",
        "path":"shipping.html",
        "selectedid":"collapse2"
     },
     {  
        "heading":"Edit Weight Based",
        "path":"shipping.html",
        "selectedid":"collapse3"
     },
     {  
        "heading":"Setting Up For Pick Up Request",
        "path":"shipping.html",
        "selectedid":"collapse4"
     },

     //store

     {  
        "heading":"Change store currency",
        "path":"store.html",
        "selectedid":"collapse1"
     },
     {  
        "heading":"Set policies",
        "path":"store.html",
        "selectedid":"collapse2"
     },
     {  
        "heading":"Set About US",
        "path":"store.html",
        "selectedid":"collapse3"
     },
     {  
        "heading":"Set contact information",
        "path":"store.html",
        "selectedid":"collapse4"
     },

     //ipg

     {  
        "heading":"Cash Payment",
        "path":"ipg.html",
        "selectedid":"collapse1"
     },
     {  
        "heading":"Paypal",
        "path":"ipg.html",
        "selectedid":"collapse2"
     },
     {  
        "heading":"Stripe",
        "path":"ipg.html",
        "selectedid":"collapse3"
     }
  ];    

$('#txt-search').keyup(function(){
    var searchField = $(this).val();
     if(searchField === '')  {
        $('#filter-records').html('');
        $(".main-section").show();
        return;
     }
     
        var regex = new RegExp(searchField, "i");
        var output = '';
        // var output = '<div class="row">';
        var count = 1;
       $.each(data, function(key, val){
        if ((val.heading.search(regex) != -1)) {
          output += '<div class="panel panel-default">';
          output += '<div class="panel-heading">';
          output += '<h4 class="panel-title">';
          output += '<a href="javascript:openUrl(\'' + val.path + '#' + val.selectedid + '\')" >';     
          output += '<h5>' + val.heading + '</h5>';         
          output += '</a>';
          output += '</h4>';
          output += '</div>';                            
          output += '</div>';

          if(count%2 == 0){
           // output += '</div><div class="row">'
          }

          count++;
        }
       });

      if(count > 1){
        $(".main-section").hide();
      }else{
          output += '<div class="panel panel-default">';
          output += '<div class="panel-heading">';
          output += '<h4 class="panel-title">';  
          output += '<h5>Your search - ' + searchField + ' - did not match any documents.</h5>';         
          output += '</h4>';
          output += '</div>';                            
          output += '</div>';        
      }

       // output += '</div>';
       $('#filter-records').html(output);
    });

    var url = document.location.toString();
    collapse(url);
});

function collapse(url){
  if ( url.match('#') ) {
    var hash = url.split('#')[1];

    // collapse the expanded panel
    $('#accordion .accordion-collapse').removeClass('in');

    // expand the requested panel
    $('#' + hash).addClass('in');
  }  
}

function openUrl(url){
  location.href = url;

  //If the url is to load the current page, then should reload the page
  var currentUrl = document.location.toString();
  if ( url.match('#') ) {
    var page = url.split('#')[0];

    if(currentUrl.indexOf(page) !== -1){
      location.reload(true);
    }
  }
  
}