# Testcode

useXMLRequest: function()
{
    // = Initialization
    var sServicePath = window.location.protocol + "//" + window.location.host + "/sap/opu/odata/sap/&lt;SERVICE&gt;/";
    this.oRequest = new Request(sServicePath, "None", false, function(oError) 
    {
        // = something failed.. so sad..
        $.each(oError.getSource().mMessages, function(iId, oResponse) 
        {
            for (var i = 0; i < oResponse.length; i++) 
            {
                // not forget to create dependencies for MessageBox or change it to sap.m.MessageBox.show(...)
                MessageBox.show(oResponse[i].code, {
                    title   : "Error",
                    icon    : MessageBox.Icon.ERROR,
                    actions : MessageBox.Action.OK,
                    details : oResponse[i].message
                });
            }
        }.bind(this)); 
    
    });
    // = Usage
    this.oRequest.XMLHttpRRead("/entitySet", function(oData) {
        // juhheee data received successfully
        $.each(oData.getSource().oData, function(sPath, oContext) {
            // do it ..
    
        });
    
    }.bind(this));
},