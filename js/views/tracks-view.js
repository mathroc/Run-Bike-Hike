"use strict;"
var TracksView = function() {

  function display(inTracks, displayTrackCallback) {
    // __remove_childs("tracks-list");
    var list = document.getElementById("tracks-list");
    console.log("list.childNodes",list.childNodes);
/*    for (i = 0; i = list.childNodes.length - 1; i++) {
      if (list.childNodes[i]) {
        if (list.childNodes[i].className === "it-track") {
          console.log("cleaning element " + i + " " + list.childNodes[i]);
          list.removeChild(list.childNodes[i]);
        } else {
          console.log("element " + i + " " + list.childNodes[i]);
        }
      }
      console.log("remove element " + i + " " + list.childNodes[i].textContent);
      document.getElementById("tracks-list").removeChild(list.childNodes[i]);
    }*/
    console.log("inTracks", inTracks);
    if (inTracks.length === 0) {
      __showEmpty();
    } else {
      var tracks = [];
      tracks = inTracks;
      for (var i = tracks.length - 1; i >= 0; i--) {
        __buildList(tracks[i], displayTrackCallback);
        //console.log("buildList i ", i);
      }
    }
    document.getElementById("list-spinner").className = "behind hidden";

    /*
     * TESTING !!!
     */
/*    var div = '<p><span class="align-left bold clipped">' + inTrack.name + '</span>';
    div = div + '<span class="align-right">' + Config.userDate(inTrack.date) + '</span></p>';
    div = div + '<p class="new-line"><span class="align-left">' + Config.userDistance(inTrack.distance) + '</span>';
    var d = inTrack.duration / 60000;
    div = div + '<span class="align-right">' + d.toFixed() + 'min</span></p>';
    lia.innerHTML = div;
    li.appendChild(lia);
    document.getElementById("tracks-list").appendChild(li);
    lia.addEventListener("click", function(e){
      console.log("click: track " + inTrack + "will be displayed");
      document.querySelector("#trackView").classList.remove("move-right");
      document.querySelector("#trackView").classList.add("move-center");
      Controller.displayTrack(inTrack);
    });*/
    /*
     *
     */
  }

  function reset() {
    if (document.getElementById("tracks-list").hasChildNodes()) {
      __remove_childs("tracks-list");
      var li = document.createElement("li");
      li.className = "ontop";
      li.id = "list-spinner"
      var div = '<div class="align-center top40"><progress id="spinner"></progress></div>';
      li.innerHTML = div;
      document.getElementById("tracks-list").appendChild(li);
    };
  }

  function __showEmpty() {
    var el = document.createElement("p");
    el.className = "empty-tracks";
    el.innerHTML = _("empty-list"); // "Empty tracks list.";
    document.getElementById("tracks-list").appendChild(el);
  }

  function __buildList(inTrack, displayTrackCallback) {
    // console.log("__buildList - inTrack: ", inTrack);
    var li = document.createElement("li");
    li.className = "it-track";
    var lia = document.createElement("a");
    // lia.className = "it-track";

    var div = '<p><span class="align-left clipped">' + inTrack.name + '</span>';
    var a = Config.userDistance(inTrack.distance);
    div = div + '<span class="align-right text-thin">' + a.v + a.u + '</span></p>';
    div = div + '<p class="new-line"><span class="align-left text-thin">' + Config.userDate(inTrack.date) + '</span>';
    var d = inTrack.duration / 60000;
    div = div + '<span class="align-right text-thin">' + d.toFixed() + 'min</span></p>';
    lia.innerHTML = div;
    li.appendChild(lia);
    document.getElementById("tracks-list").appendChild(li);
    lia.addEventListener("click", function(e){
      // console.log("click: track " + inTrack + "will be displayed");
      document.getElementById("views").showCard(4);
      displayTrackCallback(inTrack);
    });
  }

  function __remove_childs(parent) {
    var d = document.getElementById(parent).childNodes;
    console.log("d",d);
    for (i = 0; i = d.length - 1; i++) {
      console.log("remove element " + i + " " + d[i]);
      document.getElementById(parent).removeChild(d[i]);
    }
  }

  return {
    display: display,
    reset: reset
  };

}();
