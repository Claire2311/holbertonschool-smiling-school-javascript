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

function listQuotes() {
  const url = "https://smileschool-api.hbtn.info/quotes";

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
      for (let i = 0; i < data.length; i++) {
        addCarousselQuote(data[i]);
      }
    });
  });
}

listQuotes();
