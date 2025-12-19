import sqlalchemy as sa
from sqlalchemy.orm import declarative_base, sessionmaker
import os
from dotenv import load_dotenv


load_dotenv()

engine = sa.create_engine(os.getenv("DATABASE_URL"))
Session = sessionmaker(bind=engine)
Base = declarative_base()


class Top_product(Base):
    __tablename__ = "TOP_PRODUCT_TABLE"
    id = sa.Column(sa.Integer, primary_key=True, index=True, autoincrement=True)
    productDisplayName = sa.Column(sa.String)
    gender = sa.Column(sa.String)
    masterCategory = sa.Column(sa.String)
    subCategory = sa.Column(sa.String)
    articleType = sa.Column(sa.String)
    baseColour = sa.Column(sa.String)
    season = sa.Column(sa.String)
    year = sa.Column(sa.String)


    def __repr__(self):
        return f"<Top_product(productDisplayName='{self.productDisplayName}', gender='{self.gender}', masterCategory='{self.masterCategory}', subCategory='{self.subCategory}', articleType='{self.articleType}', baseColour='{self.baseColour}', season='{self.season}', year='{self.year})>"


def main():
    Base.metadata.create_all(bind=engine)
    data = Top_product(productDisplayName="test", gender="test", 
                       masterCategory="test", subCategory="test", articleType="test", 
                       baseColour="test", season="test", year=2000)

    with Session() as session:
        session.add(data)
        session.commit()
        print("User created successfully")


if __name__ == "__main__":
    main()
