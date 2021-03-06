var Share = function() {
  function toLocal(inFile, inName, successCallback, errorCallback) {
    console.log("saving to local :-(");
    var sdcard = navigator.getDeviceStorage("sdcard");
    // var blob = new Blob (["this is a new file."], {"type":"plain/text"});
    var blob = new Blob ([inFile], {"type":"plain/text"});

    var req = sdcard.addNamed(blob, "/sdcard/rbh/" + inName);

    req.onsuccess = function() {
      successCallback("success on saving file ", this.result);
    };

    req.onerror = function() {
      if (this.error.name === "NoModificationAllowedError") {
        console.warn('Unable to write the file: ', 'File already exists');
        errorCallback('Unable to write the file: ' + 'File already exists');
      } else if (this.error.name === "SecurityError") {
        console.warn('Unable to write the file: ', 'Permission Denied');
        errorCallback('Unable to write the file: ' + 'Permission Denied');
      } else {
        console.warn('Unable to write the file: ', this.error.name);
        errorCallback('Unable to write the file: ' + this.error.name);
      };
    };
  }

  function toEmail(inTrack, inFile) {
    var blob = new Blob([inFile], {type: "text/plain"});
    var name = inTrack.name + ".gpx";
    var subject = "Track: " + name;
    
    var activity = new MozActivity({
      name: "new",
      data: {
        type: "mail",
        url: "mailto:?subject=" + subject,
        filenames: [name, inTrack.name + ".jpg"],
        blobs: [blob, inTrack.map]
      }
    });

    activity.onsuccess = function() {
      console.log("email send with success:", this.result);
    }
    activity.onerror = function() {
      console.log("email not send:", this.error);
    }
  }

  function toTwitter() {}



  return {
    toLocal: toLocal,
    toEmail: toEmail,
    toTwitter: toTwitter
  }
}();
