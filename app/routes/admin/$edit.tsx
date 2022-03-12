import {
  useTransition,
  useActionData,
  redirect,
  Form,
  json,
  LoaderFunction,
  useLoaderData,
} from "remix";
import type { ActionFunction } from "remix";
import { createPost, getPostToEdit } from "~/post";
import invariant from "tiny-invariant";

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.edit, "expected params.edit");
  return json(await getPostToEdit(params.edit));
};

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return json(errors);
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");

  await createPost({ title, slug, markdown });

  return redirect("/admin");
};

export default function EditPost() {
  const post = useLoaderData();
  const errors = useActionData();
  const transition = useTransition();

  return (
    <Form method="post">
      <p>
        <label>
          Titel: {errors?.title ? <em>Title is required</em> : null}
          <input type="text" name="title" defaultValue={post.title} />
        </label>
      </p>
      <p>
        <label>
          Slug: {errors?.slug ? <em>Slug is required</em> : null}
          <input type="text" name="slug" defaultValue={post.slug} />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">Markdown:</label>{" "}
        {errors?.markdown ? <em>Markdown is required</em> : null}
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          defaultValue={post.body}
        />
      </p>
      <p>
        <button type="submit">
          {transition.submission ? "Sparar..." : "Spara inlägg"}
        </button>
      </p>
    </Form>
  );
}
