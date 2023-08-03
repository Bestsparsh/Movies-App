import React from 'react'
import { useParams } from 'react-router-dom'
import fetchPerson from '../../service/FetchPerson'
import './style.css'
import { useQuery } from "react-query"
import credits from '../../service/Credit'

// import { original } from '@reduxjs/toolkit'


const Person = () => {
  const { id } = useParams()

  const { data: person } = useQuery(["person", id], () => fetchPerson(id), {
    keepPreviousData: true
  })

  const { data: person1 } = useQuery(["persons", id], () => credits(id), {
    keepPreviousData: true
  })
  console.log('person =>', person)
  return (
    <>
      <div class="column_wrapper reverse">

        <div class="content_wrapper">
          <div class="grey_column">
            <section id="original_header" class="images inner">
              <div class="poster_wrapper profile">
                <div class="image_content">
                  <img class="profile lazyload lazyloaded" src={`data:image/jpeg;base64,${person?.imgBase64}`} alt={person?.name} data-src={`data:image/jpeg;base64,${person?.imgBase64}`} data-srcset={`data:image/jpeg;base64,${person?.imgBase64}`} />

                </div>
              </div>
            </section>


            <div class="column">
              <section class="full_wrapper facts left_column">
                <div class="social_links">
                </div>


                <h3><bdi>Personal Info</bdi></h3>

                <section class="facts">
                  {/* <p><strong><bdi>Known For</bdi></strong> {person?.known_for_department}</p>
                  <p><strong><bdi>Known Credits</bdi></strong>{person1?.cast.length}</p> */}
                  <p><strong><bdi>Gender</bdi></strong> {person?.gender}</p>
                  <p class="full">
                    <strong><bdi>Birthday</bdi></strong>
                    {person?.dateOfBirth}
                  </p>
                  {/* <p class="full"><strong><bdi>Place of Birth</bdi></strong>{person?.dateofBirth}</p> */}

                  {/* <p class="full true">
                    <strong><bdi>Also Known As</bdi></strong>
                  </p>
                  <ul>
                    {person?.also_known_as.map((item) => (
                      <li key={item} itemProp='additonalName'>
                        {item}
                      </li>
                    ))}
                  </ul> */}
                </section>
              </section>
            </div>
          </div>

          <div>
            <div class="white_column">
              <section>
                <div class="title" dir="auto">
                  <h2 class="title"><a href={`/person/${person?.id}`}>{person?.name}</a></h2>
                </div>
              </section>

              <section class="full_wrapper">
                <h3 dir="auto">Biography</h3>
                <div dir="auto" class="biography true">
                  <div class="content fade_text">
                    <div class="text initial truncate should_fade">
                      <p>{person?.bio}</p>
                    </div>
                    {/* <div class="read_more"><a class="read_more no_click" href="#">Read More <span class="glyphicons_v2 chevron-right"></span></a></div> */}
                  </div>
                </div>
              </section>

              <section class="full_wrapper">
                <div id="known_for">
                  <h3 dir="auto">Known For</h3>

                  <div id="known_for_scroller" class="scroller_wrap should_fade is_fading">
                    <ul class="horizontal_media_list scroller">
                      {person1?.map((item) => (
                        <li key={item.id} class="account_adult_false item_adult_false">
                          <div class="image">
                            <a href={`/movie/${item.movieId}`}>
                              <img loading="lazy" class="poster" src={`data:image/jpeg;base64,${item.posterBase64}`} alt={item.title} />

                            </a>
                          </div>
                          <p><a class="title" href={`/movie/${item.movieId}`}><bdi>{item.title}</bdi></a></p>

                        </li>
                      ))}
                    </ul>


                  </div>

                </div>
              </section>

              <section class="full_wrapper credits">
                <div class="credits_list">
                  {/* <h3 class="zero">{person?.known_for_department}</h3> */}

                  <table class="card credits" border="0" cellspacing="0" cellpadding="0" data-role="tooltip">
                    <tbody>
                      {person1?.map((item) => (
                        <tr>
                          <td class="year">{item.featuredYear}</td>
                          <td class="seperator"><span data-url={`/movie/${item.id}`} data-id={item.credit_id} data-type="movie" data-slug={item.id} class="glyphicons_v2 circle-empty account_adult_false item_adult_false"></span></td>
                          <td class="role true account_adult_false item_adult_false">
                            <a class="tip" href="/movie/1102493"><bdi>{item.title}</bdi></a>
                            {/* <span class="group"> as <span class="character">{item.character}</span></span> */}
                          </td>
                        </tr>
                      ))}

                    </tbody></table>

                </div>
              </section>
            </div>
          </div>



        </div>
      </div>

    </>
  )

}

export default Person