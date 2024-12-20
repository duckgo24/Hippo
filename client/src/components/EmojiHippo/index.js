import React from 'react';
import { FaHeart, FaRegSurprise } from 'react-icons/fa';
import { FiSmile, FiPlusSquare } from 'react-icons/fi';
import { FaRegFaceSadCry } from 'react-icons/fa6';
import { LuAngry } from 'react-icons/lu';
import { BiLike } from 'react-icons/bi';

export default function EmojiHippo({ onClick }) {
      const handleClick = (emojiName) => {
            if (onClick) {
                  onClick(emojiName);
            }
      };

      return (
            <div className="flex flex-row gap-2 py-2 px-3">
                  <button className="hover:scale-125" onClick={() => handleClick('heart')}>
                        <FaHeart color="red" size={25} />
                  </button>
                  <button className="hover:scale-125" onClick={() => handleClick('smile')}>
                        <FiSmile size={25} />
                  </button>
                  <button className="hover:scale-125" onClick={() => handleClick('surprise')}>
                        <FaRegSurprise size={25} />
                  </button>
                  <button className="hover:scale-125" onClick={() => handleClick('sad')}>
                        <FaRegFaceSadCry size={25} />
                  </button>
                  <button className="hover:scale-125" onClick={() => handleClick('angry')}>
                        <LuAngry size={25} />
                  </button>
                  <button className="hover:scale-125" onClick={() => handleClick('like')}>
                        <BiLike size={25} />
                  </button>
                  <button className="hover:scale-125">
                        <FiPlusSquare size={25} />
                  </button>
            </div>
      );
}
