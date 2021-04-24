defmodule EventsSpaWeb.PostView do
  use EventsSpaWeb, :view
  alias EventsSpaWeb.PostView
  alias EventsSpaWeb.UserView
  alias EventsSpaWeb.ResponseView

  def render("index.json", %{posts: posts}) do
    %{data: render_many(posts, PostView, "post.json")}
  end

  def render("show.json", %{post: post}) do
    %{data: render_one(post, PostView, "post.json")}
  end

  def render("post.json", %{post: post}) do
    user = if Ecto.assoc_loaded?(post.user) do
      render_one(post.user, UserView, "user.json")
    else
      nil
    end

    responses = if Ecto.assoc_loaded?(post.responses) do
      render_many(post.responses, ResponseView, "response.json")
    else
      nil
    end

    comments = if Ecto.assoc_loaded?(post.comments) do
      render_many(post.comments, CommentView, "comment.json")
    else
      nil
    end

    #IO.inspect(responses)
    %{
      id: post.id,
      title: post.title,
      description: post.description,
      date: post.date,
      user: user,
      responses: responses,
      comments: comments
    }
  end
end
