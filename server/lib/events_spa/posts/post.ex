defmodule EventsSpa.Posts.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :title, :string
    field :date, :string
    field :description, :string

    belongs_to :user, EventsSpa.Users.User

    has_many :responses, EventsSpa.Responses.Response

    has_many :comments, EventsSpa.Comments.Comment


    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:title, :date, :description, :user_id])
    |> validate_required([:title, :date, :description, :user_id])
  end
end
