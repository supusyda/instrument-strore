import Carousel from "react-bootstrap/Carousel";

function SlideShow() {
  return (
    <Carousel>
      <Carousel.Item>
        <div className="slide-container">
          {" "}
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1219335974/photo/instruments-in-white-wooden-background.jpg?s=612x612&w=0&k=20&c=om4Hz3c6quzHADg2jmvo0Jm3bw-S9HENfJCTN2jlSI4="
            alt="First slide"
          />
        </div>

        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-container">
          {" "}
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1219335776/vi/anh/d%E1%BB%A5ng-c%E1%BB%A5-trong-n%E1%BB%81n-g%E1%BB%97-tr%E1%BA%AFng.jpg?s=612x612&w=0&k=20&c=lMtzyrGtaQx0pSe-oa_sCc9ELOqyuj2LIXZMDo9ygKA="
            alt="Second slide"
          />
        </div>

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="slide-container">
          {" "}
          <img
            className="d-block w-100"
            src="https://media.istockphoto.com/id/1284754518/vi/anh/nh%E1%BA%A1c-giao-h%C6%B0%E1%BB%9Fng-nam-nh%E1%BA%A1c-s%C4%A9-ch%C6%A1i-violin-trong-d%C3%A0n-nh%E1%BA%A1c-t%E1%BA%ADp-trung-v%C3%A0o-cung.jpg?s=612x612&w=0&k=20&c=wQSjPsdT7uNLi0aySlamoYt4s3pwP7N9Qi64QXtU3CU="
            alt="Third slide"
          />
        </div>

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SlideShow;
