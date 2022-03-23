import React from "react";

export default function Chat({ contact }) {
  const img =
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80";

  return (
    <>
      {contact ? (
        <>
          <div style={{ height: "84.5vh" }} className="overflow-auto px-3 py-2">
            <div className="d-flex justify-content-end py-1">
              <div className="chat-me">
                Hello Admin, I Need Your Help Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Excepturi incidunt perspiciatis
                accusamus? Quas dolorem voluptates nemo tempora et, nulla error
                excepturi nihil aspernatur esse placeat. Reprehenderit
                temporibus, doloremque veniam ex consequuntur cum, fuga animi
                quidem nobis odit inventore tempora esse unde ab provident
                excepturi. Dolorem inventore earum ea cum architecto officiis
                quo minus veniam, ipsa placeat a iste nisi quia quam nemo
                facilis, necessitatibus eveniet modi ipsam deserunt odit fugit
                dolorum. Enim reiciendis molestias reprehenderit officiis
                dignissimos architecto! Cum quos iste placeat saepe magni
                voluptas ipsam minus! Facere sapiente dolorum quaerat quas
                distinctio. Architecto, blanditiis officiis laudantium aperiam
                perferendis animi?
              </div>
            </div>
            <div className="d-flex justify-content-start py-1">
              <img src={img} className="rounded-circle me-2 img-chat" />
              <div className="chat-other">
                Yes, Is there anyting I can help ? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Voluptas ipsa nemo earum. Labore
                at tempora cupiditate quisquam dicta explicabo molestias maxime
                quaerat, fugiat velit sed possimus fuga! Corrupti sunt dolorem
                tempora laboriosam. Hic, aut delectus eaque quibusdam nulla
                molestiae vel pariatur molestias voluptas facilis soluta non,
                nostrum saepe explicabo facere.
              </div>
            </div>
            <div className="d-flex justify-content-end py-1">
              <div className="chat-me">
                Hello Admin, I Need Your Help Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Excepturi incidunt perspiciatis
                accusamus? Quas dolorem voluptates nemo tempora et, nulla error
                excepturi nihil aspernatur esse placeat. Reprehenderit
                temporibus, doloremque veniam ex consequuntur cum, fuga animi
                quidem nobis odit inventore tempora esse unde ab provident
                excepturi. Dolorem inventore earum ea cum architecto officiis
                quo minus veniam, ipsa placeat a iste nisi quia quam nemo
                facilis, necessitatibus eveniet modi ipsam deserunt odit fugit
                dolorum. Enim reiciendis molestias reprehenderit officiis
                dignissimos architecto! Cum quos iste placeat saepe magni
                voluptas ipsam minus! Facere sapiente dolorum quaerat quas
                distinctio. Architecto, blanditiis officiis laudantium aperiam
                perferendis animi?
              </div>
            </div>
            <div className="d-flex justify-content-end py-1">
              <div className="chat-me">
                Hello Admin, I Need Your Help Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Excepturi incidunt perspiciatis
                accusamus? Quas dolorem voluptates nemo tempora et, nulla error
                excepturi nihil aspernatur esse placeat. Reprehenderit
                temporibus, doloremque veniam ex consequuntur cum, fuga animi
                quidem nobis odit inventore tempora esse unde ab provident
                excepturi. Dolorem inventore earum ea cum architecto officiis
                quo minus veniam, ipsa placeat a iste nisi quia quam nemo
                facilis, necessitatibus eveniet modi ipsam deserunt odit fugit
                dolorum. Enim reiciendis molestias reprehenderit officiis
                dignissimos architecto! Cum quos iste placeat saepe magni
                voluptas ipsam minus! Facere sapiente dolorum quaerat quas
                distinctio. Architecto, blanditiis officiis laudantium aperiam
                perferendis animi?
              </div>
            </div>
            <div className="d-flex justify-content-end py-1">
              <div className="chat-me">
                Hello Admin, I Need Your Help Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Excepturi incidunt perspiciatis
                accusamus? Quas dolorem voluptates nemo tempora et, nulla error
                excepturi nihil aspernatur esse placeat. Reprehenderit
                temporibus, doloremque veniam ex consequuntur cum, fuga animi
                quidem nobis odit inventore tempora esse unde ab provident
                excepturi. Dolorem inventore earum ea cum architecto officiis
                quo minus veniam, ipsa placeat a iste nisi quia quam nemo
                facilis, necessitatibus eveniet modi ipsam deserunt odit fugit
                dolorum. Enim reiciendis molestias reprehenderit officiis
                dignissimos architecto! Cum quos iste placeat saepe magni
                voluptas ipsam minus! Facere sapiente dolorum quaerat quas
                distinctio. Architecto, blanditiis officiis laudantium aperiam
                perferendis animi?
              </div>
            </div>
            <div className="d-flex justify-content-start py-1">
              <img src={img} className="rounded-circle me-2 img-chat" />
              <div className="chat-other">
                Yes, Is there anyting I can help ? Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Voluptas ipsa nemo earum. Labore
                at tempora cupiditate quisquam dicta explicabo molestias maxime
                quaerat, fugiat velit sed possimus fuga! Corrupti sunt dolorem
                tempora laboriosam. Hic, aut delectus eaque quibusdam nulla
                molestiae vel pariatur molestias voluptas facilis soluta non,
                nostrum saepe explicabo facere.
              </div>
            </div>
          </div>
          <div style={{ height: "5vh" }} className="px-3">
            <input placeholder="Send Message" className="input-message px-2" />
          </div>
        </>
      ) : (
        <div
          style={{ height: "89.5vh" }}
          className="h4 d-flex justify-content-center align-items-center"
        >
          No Message
        </div>
      )}
    </>
  );
}
