import React, {useState} from 'react';
import {Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';

const items = [
    {
        src: 'https://picsum.photos/id/123/1200/400',
        altText: 'Name',
        caption: 'M. Huzaer Rekso J.',
        key: 1,
    },
    {
        src: 'https://picsum.photos/id/456/1200/400',
        altText: 'Class',
        caption: 'MFCA',
        key: 2,
    },
    {
        src: 'https://picsum.photos/id/678/1200/400',
        altText: 'Number',
        caption: '2301939071',
        key: 3,
    },
];

const Home = props => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt={item.altText} />
                <CarouselCaption
                    captionText={item.caption}
                    captionHeader={item.caption}
                />
            </CarouselItem>
        );
    });

    return (
        <div>
            <Row className="mt-5">
                <Col className="bg-light"
                     md={{
                         offset: 3,
                         size: 6
                     }}
                     sm="12">
                    <Carousel
                        activeIndex={activeIndex}
                        next={next}
                        previous={previous}
                    >
                        <CarouselIndicators
                            items={items}
                            activeIndex={activeIndex}
                            onClickHandler={goToIndex}
                        />
                        {slides}
                        <CarouselControl
                            direction="prev"
                            directionText="Previous"
                            onClickHandler={previous}
                        />
                        <CarouselControl
                            direction="next"
                            directionText="Next"
                            onClickHandler={next}
                        />
                    </Carousel>
                    <h3 className="mt-4 text-center">Want to get out? <Link to={'/'}>Sign Out</Link></h3>
                </Col>
            </Row>
        </div>
    );
}
export default Home;