import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNFTs() {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
      );
      setNFTs(data);
      setLoading(false);
    }
    fetchNFTs();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!loading ? (
            <div className="col-md-12">
              <ol className="author_list">
                {nfts.map((nfts, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${nfts.authorId}`}>
                        <img
                          className="lazy pp-author"
                          src={nfts.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to={`/author/${nfts.authorId}`}>
                        {nfts.authorName}
                      </Link>
                      <span>{nfts.price} ETH</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="col-md-12">
              <ol className="author_list">
                {nfts.map((nfts, index) => (
                  <li key={index}>
                    <div className="author_list_pp">
                      <Link to={`/author/${nfts.authorId}`}>
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Skeleton
                        width="100px"
                        height="20px"
                        borderRadius="2px"
                      />
                      <br />
                      <Skeleton width="50px" height="20px" borderRadius="2px" />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
