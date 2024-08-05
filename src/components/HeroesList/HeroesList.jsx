// import { useDispatch, useSelector } from "react-redux";
// import { selectHeroes, selectPage } from "../../redux/slice";
// import HeroItem from "../HeroItem/HeroItem";
// import s from "./HeroesList.module.css";
// import { fetchMoreHeroesThunk } from "../../redux/operations";
// import { useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";

// function HeroesList() {
//   const heroes = useSelector(selectHeroes);
//   const page = useSelector(selectPage);
//   const dispatch = useDispatch();
//   const containerRef = useRef(null);
//   const { id } = useParams();
//   console.log(id);

//   useEffect(() => {
//     const scrollToBottom = () => {
//       if (containerRef.current) {
//         requestAnimationFrame(() => {
//           const height =
//             containerRef.current.firstElementChild?.getBoundingClientRect()
//               .height || 0;
//           containerRef.current.scrollBy({
//             behavior: "smooth",
//             top: height,
//           });
//         });
//       }
//     };

//     scrollToBottom();
//   }, [heroes]);

//   return (
//     <div className={s.list_wrapper}>
//       <ul className={!id ? s.list : s.list_col} ref={containerRef}>
//         {heroes.map((hero) => (
//           <HeroItem key={hero.id} hero={hero} />
//         ))}
//       </ul>
//       {page < 9 && (
//         <button
//           className={s.more_btn}
//           type="button"
//           onClick={() => dispatch(fetchMoreHeroesThunk(page))}
//         >
//           Load more
//         </button>
//       )}
//     </div>
//   );
// }

// export default HeroesList;

// import { useDispatch, useSelector } from "react-redux";
// import { selectHeroes, selectPage } from "../../redux/slice";
// import HeroItem from "../HeroItem/HeroItem";
// import s from "./HeroesList.module.css";
// import { fetchMoreHeroesThunk } from "../../redux/operations";
// import { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";

// function HeroesList() {
//   const heroes = useSelector(selectHeroes);
//   const page = useSelector(selectPage);
//   const dispatch = useDispatch();
//   const containerRef = useRef(null);
//   const [shouldScroll, setShouldScroll] = useState(false);
//   const { id } = useParams();

//   // Використовуємо useEffect для скроллу тільки коли `shouldScroll` є true
//   useEffect(() => {
//     if (shouldScroll) {
//       const scrollToBottom = () => {
//         if (containerRef.current) {
//           requestAnimationFrame(() => {
//             const height =
//               containerRef.current.firstElementChild?.getBoundingClientRect()
//                 .height || 0;
//             containerRef.current.scrollBy({
//               behavior: "smooth",
//               top: height * 2, // Прокрутка на висоту двох карток
//             });
//           });
//         }
//       };

//       scrollToBottom();
//       // Скидання стану скроллу після завершення
//       setShouldScroll(false);
//     }
//   }, [heroes, shouldScroll]);

//   const handleLoadMore = () => {
//     dispatch(fetchMoreHeroesThunk(page));
//     setShouldScroll(true); // Активуємо скролл
//   };

//   return (
//     <div className={s.list_wrapper}>
//       <ul className={!id ? s.list : s.list_col} ref={containerRef}>
//         {heroes.map((hero) => (
//           <HeroItem key={hero.id} hero={hero} />
//         ))}
//       </ul>
//       {page < 9 && (
//         <button className={s.more_btn} type="button" onClick={handleLoadMore}>
//           Load more
//         </button>
//       )}
//     </div>
//   );
// }

// export default HeroesList;

import { useDispatch, useSelector } from "react-redux";
import { selectHeroes, selectIsLoading, selectPage } from "../../redux/slice";
import HeroItem from "../HeroItem/HeroItem";
import s from "./HeroesList.module.css";
import { fetchMoreHeroesThunk } from "../../redux/operations";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

function HeroesList() {
  const heroes = useSelector(selectHeroes);
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const loading = useSelector(selectIsLoading); // Додатковий стан для контролю завантаження
  const { id } = useParams();

  // Використовуємо useEffect для скроллу тільки коли `shouldScroll` є true
  useEffect(() => {
    if (shouldScroll && !loading) {
      const scrollToBottom = () => {
        if (containerRef.current) {
          requestAnimationFrame(() => {
            const height =
              containerRef.current.firstElementChild?.getBoundingClientRect()
                .height || 0;
            containerRef.current.scrollBy({
              behavior: "smooth",
              top: height * 2, // Прокрутка на висоту двох карток
            });
          });
        }
      };

      scrollToBottom();
      setShouldScroll(false); // Скидання стану скроллу після завершення
    }
  }, [heroes, shouldScroll, loading]);

  const handleLoadMore = () => {
    dispatch(fetchMoreHeroesThunk(page)).then(() => {
      setShouldScroll(true); // Активуємо скролл
    });
  };

  return (
    <div className={s.list_wrapper}>
      {loading && <Loader />}
      <ul className={!id ? s.list : s.list_col} ref={containerRef}>
        {heroes.map((hero) => (
          <HeroItem key={hero.id} hero={hero} />
        ))}
      </ul>
      {page < 9 && (
        <button
          className={s.more_btn}
          type="button"
          onClick={handleLoadMore}
          disabled={loading} // Дизейбл кнопки під час завантаження
        >
          Load more
        </button>
      )}
    </div>
  );
}

export default HeroesList;
