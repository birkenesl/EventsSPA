defmodule EventsSpa.Repo.Migrations.CreateResponses do
  use Ecto.Migration

  def change do
    create table(:responses) do
      add :choice, :string, null: false

      add :post_id, references(:posts, on_delete: :nothing), null: false
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

  end
end
