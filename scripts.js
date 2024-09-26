function addCarousselQuote(data) {
  $("#carousel-for-quotes").append(
    $(
      `${
        data.id === 1
          ? "<div class='carousel-item active'>"
          : "<div class='carousel-item'>"
      }`
    ).append(
      $("<div class='row mx-auto align-items-center'>").append(
        $(
          "<div class='col-12 col-sm-2 col-lg-2 offset-lg-1 text-center'>"
        ).append(
          $(
            `<img src="${data.pic_url}" class="d-block align-self-center" alt="Carousel Pic ${data.id}">`
          )
        ),
        $(
          "<div class='col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0'>"
        ).append(
          $("<div class='quote-text'>").append(
            $("<p class='text-white'>").text(data.text),
            $("<h4 class='text-white font-weight-bold'>").text(data.name),
            $("<span class='text-white'>").text(data.title)
          )
        )
      )
    )
  );
}

// function listQuotes() {
//   const url = "https://smileschool-api.hbtn.info/quotes";

//   $(document).ready(function () {
//     $.ajax({
//       url: url,
//       data: {
//         action: "query",
//         format: "json",
//         origin: "*",
//       },
//       method: "GET",
//       dataType: "json",
//       crossDomain: true,
//       beforeSend: function () {
//         $(".loader").show();
//       },
//       success: function (msg) {
//         $(".loader").hide();
//       },
//     }).done(function (data) {
//       for (let i = 0; i < data.length; i++) {
//         addCarousselQuote(data[i]);
//       }
//     });
//   });
// }

function getInformations(url, funct) {
  $(document).ready(function () {
    $.ajax({
      url: url,
      data: {
        action: "query",
        format: "json",
        origin: "*",
      },
      method: "GET",
      dataType: "json",
      crossDomain: true,
      beforeSend: function () {
        $(".loader").show();
      },
      success: function (msg) {
        $(".loader").hide();
      },
    }).done(function (data) {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        funct(data[i]);
      }
    });
  });
}

// function getInformationsById(url, id) {
//   return new Promise((resolve, reject) => {
//     $(document).ready(function () {
//       $.ajax({
//         url: url,
//         data: {
//           action: "query",
//           format: "json",
//           origin: "*",
//         },
//         method: "GET",
//         dataType: "json",
//         crossDomain: true,
//         beforeSend: function () {
//           $(".loader").show();
//         },
//         success: function (msg) {
//           $(".loader").hide();
//         },
//       }).done(function (data) {
//         for (let i = 0; i < data.length; i++) {
//           if (data[i].id === id) {
//             resolve(data[i]);
//           }
//         }
//       });
//     });
//   });
// }

// listQuotes();

// function addCarousselVideo(data) {
//   $("#carousel-for-popular-tutorials").append(
//     $(
//       `${
//         data.id === 1
//           ? "<div class='carousel-item active'>"
//           : "<div class='carousel-item'>"
//       }`
//     ).append(
//       $("<div class='row align-items-center mx-auto'>").append(
//         $(
//           "<div class='col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center justify-content-md-end justify-content-lg-center'>"
//         ).append(
//           $("<div class='card'>").append(
//             $(
//               `<img src="${data.thumb_url}" class="card-img-top" alt="Video thumbnail">`
//             ),
//             $("<div class='card-img-overlay text-center'>").append(
//               $(
//                 "<img src='images/play.png' alt='Play' width='64px' class='align-self-center play-overlay'/>"
//               )
//             ),
//             $("<div class='card-body'>").append(
//               $("<h5 class='card-title font-weight-bold'>").text(data.title),
//               $("<p class='card-text text-muted'>").text(data.title), //! à changer avec les sous-titres
//               $("<div class='creator d-flex align-items-center'>").append(
//                 $(
//                   `<img src="${data.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle"/>`
//                 ),
//                 $("<h6 class='pl-3 m-0 main-color'>").text(data.author)
//               ),
//               $(
//                 "<div class='info pt-3 d-flex justify-content-between'>"
//               ).append(
//                 $("<div class='rating'>"),
//                 $("<span class='main-color'>").text(data.duration)
//               )
//             )
//           )
//         )
//       )
//     )
//   );
// }

function generateCard(data) {
  const divCard = $('<div class="card">')
    .append(
      $(
        `<img src="${data.thumb_url}" class="card-img-top" alt="Video thumbnail">`
      ),
      $("<div class='card-img-overlay text-center'>").append(
        $(
          "<img src='images/play.png' alt='Play' width='64px' class='align-self-center play-overlay'/>"
        )
      ),
      $("<div class='card-body'>").append(
        $("<h5 class='card-title font-weight-bold'>").text(data.title),
        // prettier-ignore
        $("<p class='card-text text-muted'>").text(data['sub-title']), //! à changer avec les sous-titres
        $("<div class='creator d-flex align-items-center'>").append(
          $(
            `<img src="${data.author_pic_url}" alt="Creator of Video" width="30px" class="rounded-circle"/>`
          ),
          $("<h6 class='pl-3 m-0 main-color'>").text(data.author)
        ),
        $("<div class='info pt-3 d-flex justify-content-between'>").append(
          $("<div class='rating'>"),
          $("<span class='main-color'>").text(data.duration)
        )
      )
    )
    .attr("id", "card" + data.id);
  return divCard;
}

function addCarousselVideo(data) {
  $("#carousel-for-popular-tutorials").append(
    $("<div>").append(generateCard(data))
  );
}

function addCarousselLatestVideo(data) {
  $("#latest-videos").append(generateCard(data));
}

// getInformations(
//   "https://smileschool-api.hbtn.info/popular-tutorials",
//   generateCard
// );

$(document).ready(function () {
  getInformations(
    "https://smileschool-api.hbtn.info/quotes",
    addCarousselQuote
  );

  getInformations(
    "https://smileschool-api.hbtn.info/popular-tutorials",
    addCarousselVideo
  );

  getInformations(
    "https://smileschool-api.hbtn.info/latest-videos",
    addCarousselLatestVideo
  );
});
