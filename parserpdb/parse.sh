#!/bin/bash
tab=(1A73 1A74 1AG4 1CJA 1CYQ  1CZ0 1EVW  1EVX 1HDF 1IJ5 1IJ6 1IPP 2BL0 2EIX 2O6M 3A5P)
for i in ${tab[*]}
do
    echo $i
    wget http://www.rcsb.org/pdb/files/$i.pdb.gz
    gunzip $i.pdb.gz
    rm $i.pdb.gz
    mv $i.pdb ../ProteinPDB
done
