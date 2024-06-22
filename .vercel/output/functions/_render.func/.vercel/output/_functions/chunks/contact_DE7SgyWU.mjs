import { k as createComponent, l as renderTemplate, m as maybeRenderHead } from './astro/server_DAcnmFJu.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="contact-form__container"> <h2>Contact</h2> <form class="contact-form"> <div class="form__component animation--1"> <label for="name">Name</label> <input type="text" name="name"> </div> <div class="form__component animation--2"> <label for="email">E-mail</label> <input type="text" name="email"> </div> <div class="form__component animation--3"> <label for="subject">Subject</label> <select name="subject"> <option value="form_subject_bugdet">Budget</option> <option value="form_subject_questions">Questions</option> <option value="form_subject_opinion">Opinion</option> <option value="form_subject_suggestions">Suggestions</option> <option value="form_subject_chat">Just chatting</option> <option value="form_subject_other">Other</option> </select> </div> <div class="form__component animation--4"> <label for="message">Message</label> <textarea name="message"></textarea> </div> <div class="form__component form__component--submit animation--5"> <input type="submit" name="submit" class="form__submit" value="form_send"> </div> </form> </div>`;
}, "/Users/steven/Desktop/my-portfolio-astro/MY-PORTFOLIO-ASTRO/src/pages/contact.astro", void 0);

const $$file = "/Users/steven/Desktop/my-portfolio-astro/MY-PORTFOLIO-ASTRO/src/pages/contact.astro";
const $$url = "/contact";

export { $$Contact as default, $$file as file, $$url as url };
