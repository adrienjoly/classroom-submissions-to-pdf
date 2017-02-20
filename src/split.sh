#!/bin/bash

STUDENT_GROUPS=( 1 2 3 )

for GRP in "${STUDENT_GROUPS[@]}"
do
  SOURCE_FILE="submissions-classe-$GRP.pdf"
  echo ""
  echo " == $SOURCE_FILE"
  STUDENTS=()
  PAGES=()

  # 1) extract page numbers of every student
  while read STUDENT
  do
    STUDENT_AGGR=${STUDENT//: /:}         # remove space before student name
    STUDENT_AGGR=${STUDENT_AGGR// (/:}    # turn " (" into a separator
    STUDENT_AGGR=${STUDENT_AGGR// /_}     # turn spaces into underscores
    STUDENT_WORDS=(${STUDENT_AGGR//:/ })  # extract student name from colon-separated string
    STUDENTS+=(${STUDENT_WORDS[2]})
    PAGES+=("${STUDENT%:Etudiant*}")
  done <<<"$(pdfgrep --page-number "Etudiant" "$SOURCE_FILE")"

  # 2) extract pages for every student
  for STUDENT in "${!PAGES[@]}"
  do
    STUDENT_NAME=${STUDENTS[STUDENT]}
    OUTPUT_FILE="submissions-classe-$GRP-student-$STUDENT-$STUDENT_NAME.pdf"
    PAGE_FIRST=${PAGES[STUDENT]}
    PAGE_LAST=$((${PAGES[STUDENT+1]}-1))
    if [ $PAGE_LAST == -1 ]
    then
      PAGE_LAST="end"
    fi
    PAGE_RANGE="$PAGE_FIRST-$PAGE_LAST"
    echo " - student #$STUDENT (pages $PAGE_RANGE) => $OUTPUT_FILE ..."
    pdftk "$SOURCE_FILE" cat $PAGE_RANGE output "$OUTPUT_FILE"
  done
  
done

# pdftk submissions-classe-1.pdf cat 1-1 output out1.pdf
# pdftk submissions-classe-1.pdf cat 2-6 output out2.pdf
# pdftk submissions-classe-1.pdf cat 7-end output out3.pdf
