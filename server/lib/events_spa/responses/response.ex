defmodule EventsSpa.Responses.Response do
  use Ecto.Schema
  import Ecto.Changeset

  schema "responses" do
    field :choice, :string

    belongs_to :post, EventsSpa.Posts.Post
    belongs_to :user, EventsSpa.Users.User

    timestamps()
  end

  @doc false
  def changeset(response, attrs) do
    response
    |> cast(attrs, [:choice, :post_id, :user_id])
    |> validate_required([:choice, :post_id, :user_id])
  end
end
