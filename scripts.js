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
      for (let i = 0; i < data.length; i++) {
        funct(data[i]);
      }
    });
  });
}

function generateCard(data) {
  return `<div class="card align-items-center">
  <img src="${data.thumb_url}" class="card-img-top" alt="data thumbnail"/>
  <div class="card-img-overlay text-center">
      <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay"/>
  </div>
  <div class="card-body">
      <h5 class="card-title font-weight-bold">${data.title}</h5>
      <p class="card-text text-muted">${data["sub-title"]}</p>
      <div class="creator d-flex align-items-center">
          <img src="${
            data.author_pic_url
          }" alt="Creator of data" width="30px" class="rounded-circle"/>
          <h6 class="pl-3 m-0 main-color">${data.author}</h6>
      </div>
      <div class="info pt-3 d-flex justify-content-between">
          <div class="rating">
              ${'<img src="images/star_on.png" alt="star on" width="15px" />\n'.repeat(
                data.star
              )}
              ${'<img src="images/star_off.png" alt="star off" width="15px" />\n'.repeat(
                5 - data.star
              )}
          </div>
          <span class="main-color">${data.duration}</span>
      </div>
  </div>
</div>`;
}

function addCarousselVideo(data) {
  $("#carousel-for-popular-tutorials").append(
    $("<div>").addClass("carousel-slick-item").append(generateCard(data))
  );

  $(document).ready(function () {
    $("#carousel-for-popular-tutorials").slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: true,
      prevArrow:
        '<a class="carousel-control-prev arrow-left" role="button"><img src="images/arrow_black_left.png" alt="Previous" aria-hidden="true"/><span class="sr-only">Previous</span></a>',
      nextArrow:
        '<a class="carousel-control-next arrow-right" role="button"><img src="images/arrow_black_right.png" alt="Next" aria-hidden="true"/><span class="sr-only">Next</span></a>',
    });
  });
}

function addCarousselLatestVideo(data) {
  $("#latest-videos").append(generateCard(data));
}

function displayVideosCourses() {
  $(document).ready(function () {
    // Récupérer les valeurs des champs
    const q = $("#keywords").val();
    const topic = $("#dropdownMenuLinkTopic span").text();
    const sort = $("#dropdownMenuLinkSort span").text();

    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
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
      $("#videos-courses").empty();

      if (q) {
        data.courses = data.courses.filter(function (course) {
          return course.keywords.includes(q);
        });
      }
      if (topic !== "All") {
        data.courses = data.courses.filter(function (course) {
          return course.topic === topic;
        });
      }
      if (sort === "Most popular") {
        data.courses.sort(function (a, b) {
          return b.star - a.star;
        });
      }
      if (sort === "Most recent") {
        data.courses.sort(function (a, b) {
          return new Date(b.published_at) - new Date(a.published_at);
        });
      }
      if (sort === "Most viewed") {
        data.courses.sort(function (a, b) {
          return b.views - a.views;
        });
      }
      data.courses.forEach(function (course) {
        const videoCard = generateCard(course);
        $("#videos-courses").append(videoCard);
      });
      $("#numberOfVideos").text(`${data.courses.length} videos`);
    });
  });
}

function displayDropdownTopics() {
  $(document).ready(function () {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      data: {
        action: "query",
        format: "json",
        origin: "*",
      },
      method: "GET",
      dataType: "json",
      crossDomain: true,
    }).done(function (data) {
      const topics = data.topics;
      topics.forEach(function (topic) {
        $("#topic").append(
          $(`<a data-value="${topic}" class="dropdown-item" href="#">`).text(
            capitalizeFirstLetter(topic)
          )
        );
      });
    });
  });
}

function displayDropdownSort() {
  $(document).ready(function () {
    $.ajax({
      url: "https://smileschool-api.hbtn.info/courses",
      data: {
        action: "query",
        format: "json",
        origin: "*",
      },
      method: "GET",
      dataType: "json",
      crossDomain: true,
    }).done(function (data) {
      const sorts = data.sorts;
      sorts.forEach(function (sort) {
        $("#sort-by").append(
          $(`<a data-value="${sort}" class="dropdown-item" href="#">`).text(
            removeUnderscore(capitalizeFirstLetter(sort))
          )
        );
      });
    });
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeUnderscore(string) {
  return string.replace(/_/g, " ");
}

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

  $("#keywords").on("input", function () {
    displayVideosCourses();
  });

  $(document).on("click", "#topic a", function () {
    const value = $(this).text();
    $("#dropdownMenuLinkTopic span").text(value);
    displayVideosCourses();
  });

  $(document).on("click", "#sort-by a", function () {
    const value = $(this).text();
    $("#dropdownMenuLinkSort span").text(value);
    displayVideosCourses();
  });

  displayDropdownTopics();
  displayDropdownSort();
  displayVideosCourses();
});
