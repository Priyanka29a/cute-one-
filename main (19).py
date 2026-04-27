"import streamlit as st

st.set_page_config(page_title="Cute Love App 💖")

st.title("For You 💕")

st.write("Hey... I made something for you 😊")

if st.button("Do you love me? 💖"):
    st.success("I knew it 😘")

if st.button("Click for surprise 🎁"):
    st.balloons()
    st.write("You're special 💫")
