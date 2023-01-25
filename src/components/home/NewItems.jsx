import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const NewItems = () => {
  const [nfts, setNFTs] = useState([]);
  const [owl, setOwl] = useState(false);
  const [loading, setLoading] = useState(true);
  const options = {
    items: 4,
    loop: true,
    margin: 10,
    nav: true,
    mouseDrag: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
      1200: { items: 4 },
    },
  };

  useEffect(() => {
    async function fetchNFTs() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems/"
      );
      setNFTs(data);
      setOwl(true);
      setLoading(false);
    }
    fetchNFTs();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <OwlCarousel {...options}>
              {nfts.map((nfts, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={nfts.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">{nfts.expiryDate}</div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${nfts.nftId}`}>
                      <img
                        src={nfts.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <h4>{nfts.title}</h4>
                    </Link>
                    <div className="nft__item_price">{nfts.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{nfts.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <OwlCarousel {...options}>
              {new Array(1).fill(0).map((_, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Link
                      to=""
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <Link to={`/item-details/${nfts.nftId}`}>
                      <Skeleton width="100%" height="200px" />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to="/item-details">
                      <Skeleton
                        width="100px"
                        height="20px"
                        borderRadius="2px"
                      />
                    </Link>
                    <div className="nft__item_price">
                      <Skeleton
                        width="100px"
                        height="20px"
                        borderRadius="2px"
                      />
                    </div>
                    <div className="nft__item_like">
                      <Skeleton width="20px" height="20px" borderRadius="2px" />
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
