defmodule EventsSpa.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  # some of the code below attributed to Nat Tuck's photo-blog-spa example code

  schema "users" do
    field :name, :string
    field :email, :string
    field :password_hash, :string
    field :password, :string, virtual: true


    has_many :posts, EventsSpa.Posts.Post
    has_many :responses, EventsSpa.Responses.Response

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    password = attrs["password"]
    user
    |> cast(attrs, [:name, :email, :password])
    |> unique_constraint(:email)
    |> validate_password
    |> hash_password
    |> validate_required([:name, :password_hash])
  end

  def hash_password(cset) do
    pass = get_field(cset, :password)
    if pass do
      change(cset, Argon2.add_hash(pass))
    else
      cset
    end
  end

  def validate_password(cset) do
    pass = get_field(cset, :password)
    if pass && String.length(pass) < 8 do
      add_error(cset, :password, "too short")
    else
      cset
    end
  end
end
