defmodule EventsSpa.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :title, :text, null: false
      add :date, :text, null: false
      add :description, :text, null: false
      add :user_id, references(:users, on_delete: :nothing), null: false


      timestamps()
    end

    create index(:posts, [:user_id])
  end
end
